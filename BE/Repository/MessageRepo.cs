using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Microsoft.EntityFrameworkCore; // Thêm dòng này để sử dụng DbUpdateException
using BE.Dtos;
using BE.Repository;

namespace BE.Repository
{
    public class MessageRepo
    {
        SwpfinalContext _context = new SwpfinalContext();
        ConversationRepo _conversationRepo = new ConversationRepo();
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

        public List<MessageDtos> GetMessageByConverId(int conversationId)
        {
            var query = (from me in _context.Messages
                         join us in _context.UserChats on me.SensiderId equals us.UserId
                         where me.CoverId == conversationId
                         orderby me.TimeStamp
                         select new MessageDtos
                         {
                             MessId = me.MessId,
                             CoverId = me.CoverId,
                             SensiderId = me.SensiderId,
                             ContentChat = me.ContentChat,
                             TimeStamp = me.TimeStamp,//DateTime.Now,
                             Role = us.Role,
                             UserName = us.UserName
                         }).ToList();
            return query;
        }

        public bool DeleteMessage(int conversationId)
        {
            try
            {
                var messagesToDelete = _context.Messages
                    .Where(m => m.CoverId == conversationId);

                _context.Messages.RemoveRange(messagesToDelete);
                _context.SaveChanges();

                return true; // Nếu xóa thành công, trả về true
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ, ví dụ như log lỗi hoặc thông báo lỗi
                Console.WriteLine($"Error deleting messages: {ex.Message}");
                return false; // Trả về false để cho biết xóa không thành công
            }
        }

        public bool DeleteAllMessageInStore(List<Conversation> list)
        {
            try
            {
                var coverIds = list.Select(c => c.ConversationId).ToList();

                var messagesToDelete = _context.Messages
                    .Where(m => coverIds.Contains(m.CoverId));

                _context.Messages.RemoveRange(messagesToDelete);
                _context.SaveChanges();

                return true; // Trả về true nếu xóa thành công
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ, ví dụ như log lỗi hoặc thông báo lỗi
                Console.WriteLine($"Error deleting messages: {ex.Message}");
                return false; // Trả về false để cho biết xóa không thành công
            }
        }

    }
}