using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebSpringApi.Abstract;
using WebSpringApi.Constants;
using WebSpringApi.Models.Account;
using WebSpringApi.Data.Entities.Identity;

namespace WebSpringApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController(
    IMapper mapper,
    IImageService imageService,
    IJwtTokenService jwtTokenService,
    UserManager<UserEntity> userManager
    ) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginViewModel model)
    {
        try
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user is null) 
                return BadRequest(new { error = "Дані вказано не вірно!" });

            if (!await userManager.CheckPasswordAsync(user, model.Password))
                return BadRequest(new { error = "Дані вказано не вірно!" });

            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
    {
        try
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user is not null) 
                throw new Exception($"Користувач {model.Email} вже зареєстрований!");

            var newUser = mapper.Map<UserEntity>(model);

            newUser.Image = model.Image is null ? null : 
                await imageService.SaveImageAsync(model.Image);

            var result = await userManager.CreateAsync(newUser, model.Password);
            
            if (result.Succeeded)
                await userManager.AddToRoleAsync(newUser, Roles.User);
            else
                throw new Exception($"Помилка створення користувача {model.Email}");

            return Created();
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
