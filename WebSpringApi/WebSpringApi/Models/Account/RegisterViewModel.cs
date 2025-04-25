namespace WebSpringApi.Models.Account;

public class RegisterViewModel
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public IFormFile? Image { get; set; }    
}
