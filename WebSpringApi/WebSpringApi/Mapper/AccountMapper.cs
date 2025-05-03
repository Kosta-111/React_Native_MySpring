using AutoMapper;
using WebSpringApi.Models.Account;
using WebSpringApi.Data.Entities.Identity;

namespace WebSpringApi.Mapper;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterViewModel, UserEntity>()
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
