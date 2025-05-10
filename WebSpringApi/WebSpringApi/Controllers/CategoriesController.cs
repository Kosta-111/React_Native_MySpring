using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using WebSpringApi.Data;
using WebSpringApi.Models.Category;
using WebSpringApi.Data.Entities.Identity;

namespace WebSpringApi.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CategoriesController(
    IMapper mapper,
    WebSpringDbContext context,
    UserManager<UserEntity> userManager
    ) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        try
        {
            var userEmail = User.Claims.FirstOrDefault()?.Value 
                ?? throw new Exception("user email undefined");

            var user = await userManager.FindByEmailAsync(userEmail)
                ?? throw new Exception($"user by email {userEmail} not found");

            var categoriesList = context.Categories
                .Where(x => x.UserId == user.Id)
                .ProjectTo<CategoryItemViewModel>(mapper.ConfigurationProvider)
                .ToList();
            
            return Ok(categoriesList);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
