using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebSpringApi.Data.Entities;

[Table("tblDishImages")]
public class DishImageEntity
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string Image { get; set; } = string.Empty;

    [ForeignKey("Dish")]
    public int DishId { get; set; }
    public virtual DishEntity Dish { get; set; }
}
