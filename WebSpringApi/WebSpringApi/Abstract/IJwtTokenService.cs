using WebSpringApi.Data.Entities.Identity;

namespace WebSpringApi.Abstract;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
