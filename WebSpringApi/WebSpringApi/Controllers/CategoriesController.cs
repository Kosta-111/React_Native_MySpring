using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using WebSpringApi.Data;
using WebSpringApi.Models.Category;
using WebSpringApi.Data.Entities.Identity;
using WebSpringApi.Abstract;
using WebSpringApi.Data.Entities;

namespace WebSpringApi.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CategoriesController(
    IMapper mapper,
    IImageService imageService,
    WebSpringDbContext context,
    UserManager<UserEntity> userManager
    ) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        try
        {
            var userId = await GetUserId()
                ?? throw new Exception("user not found!");

            var categoriesList = context.Categories
                .Where(x => x.UserId == userId)
                .ProjectTo<CategoryItemViewModel>(mapper.ConfigurationProvider)
                .ToList();
            
            return Ok(categoriesList);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CategoryCreateViewModel model)
    {
        var userId = await GetUserId();

        if (userId is null) 
            return BadRequest(new { error = "user not found!" });

        var category = mapper.Map<CategoryEntity>(model);
        category.Image = await imageService.SaveImageAsync(model.Image);
        category.UserId = userId.Value;

        context.Categories.Add(category);
        context.SaveChanges();
        return Ok(new { id = category.Id });
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromForm] CategoryEditViewModel model)
    {
        var category = context.Categories.SingleOrDefault(x => x.Id == model.Id);
        
        if (category is null) return NotFound();

        category = mapper.Map(model, category);
        
        if (model.Image is not null)
        {
            string? deleteImage = category.Image;
            category.Image = await imageService.SaveImageAsync(model.Image);
            
            if (deleteImage is not null)
                imageService.DeleteImageIfExists(deleteImage);
        }
        context.SaveChanges();
        return Ok(new { id = category.Id });
    }

    [HttpDelete("{id}")]
    public IActionResult Remove(int id)
    {
        var category = context.Categories.SingleOrDefault(x => x.Id == id);
        
        if (category is null) return NotFound();

        if (category.Image is not null)
        {
            imageService.DeleteImageIfExists(category.Image);
        }
        context.Categories.Remove(category);
        context.SaveChanges();
        return Ok();
    }

    private async Task<long?> GetUserId()
    {
        var userEmail = User.Claims.FirstOrDefault()?.Value;        
        if (userEmail is null) return null;

        var user = await userManager.FindByEmailAsync(userEmail);
        return user?.Id;
    }
}
