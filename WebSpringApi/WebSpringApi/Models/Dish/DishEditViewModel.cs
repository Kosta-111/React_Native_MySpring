namespace WebSpringApi.Models.Dish;

public class DishEditViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Price { get; set; }
    public IFormFileCollection? Images { get; set; }
}
