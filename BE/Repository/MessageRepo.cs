using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Microsoft.EntityFrameworkCore; // Thêm dòng này để sử dụng DbUpdateException


namespace BE.Repository
{
    public class MessageRepo
    {
        SwpfinalContext _context = new SwpfinalContext();
        // Add tin nhắn vào db
        public Message AddMessage(Message message)
        {
            try
            {
                _context.Messages.Add(message);
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                // Lỗi khi lưu thay đổi vào cơ sở dữ liệu
                // Có thể do ràng buộc khóa ngoại, hoặc lỗi cơ sở dữ liệu khác
                Console.WriteLine($"Database update error: {ex.Message}");

                // Nếu bạn muốn xem chi tiết lỗi cụ thể hơn
                Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");

                // Để quản lý lỗi dễ dàng hơn, có thể truyền ngoại lệ gốc ex cho mã gọi xử lý tiếp
                throw;
            }
            catch (Exception ex)
            {
                // Xử lý các ngoại lệ khác có thể xảy ra trong quá trình thêm message
                Console.WriteLine($"Error occurred while adding message: {ex.Message}");
                throw;
            }

            return message;
        }

    }
}