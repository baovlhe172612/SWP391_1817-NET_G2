using BE.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Swp391
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure CORS
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("reactApp", builder =>
                {
                    builder.WithOrigins("https://swp391-1817-net-g2-fe.techtheworld.id.vn/")
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
            builder.Services.AddLogging();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

                app.UseSwagger();
                app.UseSwaggerUI();
            

            app.UseHttpsRedirection();

            // Ensure CORS middleware is used before authorization
            app.UseCors("reactApp");

            app.UseAuthorization();

            app.MapControllers();
            app.MapHub<ChatHubs>("/Chat");
            app.MapHub<OrderHub>("/OrderHub");

            app.Run(); // Specify the IP address and port
        }
    }
}
