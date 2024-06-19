using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;
using Microsoft.EntityFrameworkCore;


namespace BE.Repository
{
    public class ConversationRepo
    {
        private SwpfinalContext _context = new SwpfinalContext();

        public Conversation FindConversation(int userId, int adminId)
        {
            var conversation
            = _context
            .Conversations
            .FirstOrDefault(cn => cn.UserChatFirstId == userId && cn.UserSecondId == adminId);

            return conversation;
        }

        public Conversation AddConversation(Conversation conversation)
        {
            try
            {
                // Thêm đối tượng vào DbContext
                _context.Conversations.Add(conversation);

                // Lưu thay đổi vào cơ sở dữ liệu
                _context.SaveChanges();

                // Lúc này, conversation.ConversationId sẽ được cập nhật với giá trị auto-increment từ cơ sở dữ liệu
                return conversation;
            }
            catch (DbUpdateException dbEx)
            {
                // Log lỗi chi tiết
                Console.WriteLine($"DbUpdateException: {dbEx.InnerException?.Message}");
                throw;
            }
            catch (Exception ex)
            {
                // Log lỗi tổng quát
                Console.WriteLine($"Exception: {ex.Message}");
                throw;
            }
        }

        public List<Conversation> GetConversationByStoreId(int id) {
            var listConversation = _context.Conversations
                                .Where( con => con.UserSecondId == id)
                                .ToList();
            return listConversation;
        }

    }
}