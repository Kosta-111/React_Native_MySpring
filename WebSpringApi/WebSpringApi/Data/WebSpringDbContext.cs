using WebSpringApi.Data.Entities;
using WebSpringApi.Data.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebSpringApi.Data;

public class WebSpringDbContext : IdentityDbContext<UserEntity, RoleEntity, long>
{
    public WebSpringDbContext(DbContextOptions<WebSpringDbContext> options)
        : base(options) { }

    public DbSet<CategoryEntity> Categories { get; set; }
    public DbSet<DishEntity> Dishes { get; set; }
    public DbSet<DishImageEntity> DishImages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserRoleEntity>(ur =>
        {
            ur.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            ur.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
        });

        builder.Entity<DishImageEntity>()
            .HasOne(e => e.Dish)
            .WithMany(e => e.DishImages)
            .HasForeignKey(e => e.DishId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<DishEntity>()
           .HasOne(e => e.Category)
           .WithMany(e => e.Dishes)
           .HasForeignKey(e => e.CategoryId)
           .OnDelete(DeleteBehavior.Cascade);
    }
}
