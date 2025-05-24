using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebSpringApi.Migrations;

/// <inheritdoc />
public partial class Adddishes : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "tblDishes",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                Price = table.Column<double>(type: "double precision", nullable: false),
                CategoryId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_tblDishes", x => x.Id);
                table.ForeignKey(
                    name: "FK_tblDishes_tblCategories_CategoryId",
                    column: x => x.CategoryId,
                    principalTable: "tblCategories",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "tblDishImages",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Image = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                DishId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_tblDishImages", x => x.Id);
                table.ForeignKey(
                    name: "FK_tblDishImages_tblDishes_DishId",
                    column: x => x.DishId,
                    principalTable: "tblDishes",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_tblDishes_CategoryId",
            table: "tblDishes",
            column: "CategoryId");

        migrationBuilder.CreateIndex(
            name: "IX_tblDishImages_DishId",
            table: "tblDishImages",
            column: "DishId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "tblDishImages");

        migrationBuilder.DropTable(
            name: "tblDishes");
    }
}
