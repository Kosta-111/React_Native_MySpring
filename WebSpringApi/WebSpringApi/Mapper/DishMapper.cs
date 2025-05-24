using AutoMapper;
using WebSpringApi.Data.Entities;
using WebSpringApi.Models.Dish;

namespace WebSpringApi.Mapper;

public class DishMapper : Profile
{
    public DishMapper()
    {
        CreateMap<DishCreateViewModel, DishEntity>()
            .ForMember(e => e.DishImages, opt => opt.Ignore());

        CreateMap<DishEditViewModel, DishEntity>()
            .ForMember(e => e.DishImages, opt => opt.Ignore());

        CreateMap<DishEntity, DishItemViewModel>()
            .ForMember(m => m.Images, opt => opt.MapFrom(e => e.DishImages.Select(x => x.Image).ToList()));
    }
}
