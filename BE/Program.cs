using BE.Hubs;

namespace Swp391
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Configure CORS

            //add cors ?? tránh
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("reactApp", builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // Add services to the container.
            builder.Services.AddSignalR();

            // Add services to the container.
            builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("reactApp"); // Áp dụng chính sách CORS cụ thể

            app.UseAuthorization();

            app.MapControllers();

            app.MapHub<ChatHubs>("/Chat");

            app.Run("http://0.0.0.0:5264");
        }
    }
}
