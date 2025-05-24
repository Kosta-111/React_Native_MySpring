using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebSpringApi.Abstract;
using WebSpringApi.Data;
using WebSpringApi.Data.Entities;
using WebSpringApi.Models.Dish;

namespace WebSpringApi.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]/[action]")]
public class DishesController(
    IMapper mapper,
    IImageService imageService,
    WebSpringDbContext context
    ) : ControllerBase
{
    [HttpGet("{categoryId}")]
    public async Task<IActionResult> GetList(int categoryId)
    {
        try
        {
            var dishEntities = await context.Dishes
                .AsNoTracking()
                .Include(x => x.DishImages)
                .Where(x => x.CategoryId == categoryId)
                .ToListAsync();

            var models = mapper.Map<List<DishItemViewModel>>(dishEntities);

            return Ok(models);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDish(int id)
    {
        try
        {
            var dishEntity = await context.Dishes
                .AsNoTracking()
                .Include(x => x.DishImages)
                .SingleOrDefaultAsync(x => x.Id == id);

            return dishEntity is null
                ? NotFound()
                : Ok(mapper.Map<DishItemViewModel>(dishEntity));
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] DishCreateViewModel model)
    {
        var dish = mapper.Map<DishEntity>(model);
        context.Dishes.Add(dish);

        if (model.Images?.Count > 0)
        {
            foreach (var image in model.Images)
            {
                var imageName = await imageService.SaveImageAsync(image);
                dish.DishImages.Add(new DishImageEntity { Image = imageName });
            }
        }
        await context.SaveChangesAsync();

        return Ok(new { id = dish.Id });
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromForm] DishEditViewModel model)
    {
        var dishEntity = await context.Dishes
            .Include(x => x.DishImages)
            .SingleOrDefaultAsync(x => x.Id == model.Id);

        if (dishEntity is null) return NotFound();

        dishEntity = mapper.Map(model, dishEntity);
        
        //remove old images if needed
        var savedOldImageNames = model.Images?
            .Where(x => x.ContentType == "image/old")
            .Select(x => x.FileName)
            .ToList() ?? [];

        var imgsToDelete = dishEntity.DishImages
            .Where(x => !savedOldImageNames.Contains(x.Image))
            .ToList();

        foreach (var img in imgsToDelete)
        {
            imageService.DeleteImageIfExists(img.Image);
            context.DishImages.Remove(img);
        }

        //save new images
        var newImageFiles = model.Images?
            .Where(x => x.ContentType != "image/old")
            ?? [];

        foreach (var newImageFile in newImageFiles)
        {
            var imageName = await imageService.SaveImageAsync(newImageFile);
            dishEntity.DishImages.Add(new DishImageEntity { Image = imageName });
        }

        await context.SaveChangesAsync();
        return Ok(new { id = dishEntity.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove(int id)
    {
        var dishEntity = await context.Dishes
            .Include(x => x.DishImages)
            .SingleOrDefaultAsync(x => x.Id == id);

        if (dishEntity is null) return NotFound();

        foreach (var dishImage in dishEntity.DishImages)
        {
            imageService.DeleteImageIfExists(dishImage.Image);
        }

        context.Dishes.Remove(dishEntity);
        await context.SaveChangesAsync();
        return Ok();
    }
}