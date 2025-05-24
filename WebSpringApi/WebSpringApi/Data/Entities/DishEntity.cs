using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebSpringApi.Data.Entities;

[Table("tblDishes")]
public class DishEntity
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [StringLength(4000)]
    public string? Description { get; set; }

    public double Price { get; set; }

    [ForeignKey("Category")]
    public int CategoryId { get; set; }
    public virtual CategoryEntity? Category { get; set; }

    public virtual ICollection<DishImageEntity> DishImages { get; set; } = [];
}
