using AutoMapper;
using WebSpringApi.Data.Entities;
using WebSpringApi.Models.Category;

namespace WebSpringApi.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemViewModel>();

        CreateMap<CategoryCreateViewModel, CategoryEntity>()
            .ForMember(opt => opt.Image, x => x.Ignore());

        CreateMap<CategoryEditViewModel, CategoryEntity>()
            .ForMember(opt => opt.Image, x => x.Ignore());
    }
}
