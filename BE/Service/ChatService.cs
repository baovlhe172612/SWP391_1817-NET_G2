using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;
using BE.Repository;

namespace BE.Service
{
    public class ChatService
    {
        private SwpfinalContext _context = new SwpfinalContext();
        private ChatRepo _chatRepo = new ChatRepo();
        // AddUseChat
        public UserChat AddUseChat(UserChat chat) {

            return _chatRepo.AddUseChat(chat);

        }

        // find UseChat by UserId
        public UserChat FindUserPassById(int id) {
            var userChatExsit = _context.UserChats.FirstOrDefault(uc => uc.UserId == id);
            
            return userChatExsit;
        }
    }
}