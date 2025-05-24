namespace WebSpringApi.Models.Dish;

public class DishItemViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Price { get; set; }
    public List<string> Images { get; set; } = [];
    public int CategoryId { get; set; }
}
