namespace WebSpringApi.Models.Account;

public class UserInfoViewModel
{
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public string? Image { get; set; }
}
