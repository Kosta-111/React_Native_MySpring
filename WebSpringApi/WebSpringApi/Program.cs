using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebSpringApi.Abstract;
using WebSpringApi.Data;
using WebSpringApi.Data.Entities.Identity;
using WebSpringApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<WebSpringDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("WebSpringConnection")));

builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 5;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<WebSpringDbContext>().AddDefaultTokenProviders();

builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();
//}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Spring v1"));

app.UseAuthorization();

app.MapControllers();

await app.SeedAsync();

app.Run();
