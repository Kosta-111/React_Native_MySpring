using System.Text;
using WebSpringApi.Data;
using WebSpringApi.Services;
using WebSpringApi.Abstract;
using WebSpringApi.Data.Entities.Identity;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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

var signingKey = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(
        builder.Configuration["JwtSecretKey"]
            ?? throw new NullReferenceException("JwtSecretKey")
    )
);

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = signingKey,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Description = "Jwt Auth header using the Bearer scheme",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer"
        }
    );
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
   });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();
//}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Spring v1"));

var imagesFolger = builder.Configuration.GetValue<string>("ImagesDir") ?? "";
var dirSave = Path.Combine(builder.Environment.ContentRootPath, imagesFolger);
Directory.CreateDirectory(dirSave);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dirSave),
    RequestPath = $"/{imagesFolger}"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.SeedAsync();

app.Run();
