using WebSpringApi.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebSpringApi.Data.Entities;

[Table("tblCategories")]
public class CategoryEntity
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string? Image { get; set; }

    [StringLength(4000)]
    public string? Description { get; set; }

    [ForeignKey("User")]
    public long UserId { get; set; }
    public virtual UserEntity? User { get; set; }
}
