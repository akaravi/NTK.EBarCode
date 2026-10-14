using NTK.EBarCode.Api.Services;
using NTK.EBarCode.Api.Dtos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddScoped<IBarcodeService, BarcodeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Add CORS policy to allow Angular frontend
app.UseCors(policy =>
{
    policy.WithOrigins("http://localhost:51722")
          .AllowAnyHeader()
          .AllowAnyMethod();
});

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();