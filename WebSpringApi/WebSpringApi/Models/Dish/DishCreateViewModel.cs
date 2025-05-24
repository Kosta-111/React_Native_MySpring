namespace WebSpringApi.Models.Dish;

public class DishCreateViewModel
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Price { get; set; }
    public IFormFileCollection? Images { get; set; }
    public long CategoryId { get; set; }
}
