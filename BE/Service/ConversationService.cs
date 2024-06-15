using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;
using BE.Repository;

namespace BE.Service
{
    public class ConversationService
    {
        private SwpfinalContext _context = new SwpfinalContext();

        private ConversationRepo _conversationRepo = new ConversationRepo();

        public Conversation FindConversation(int userId, int adminId)
        {
            return _conversationRepo.FindConversation(userId, adminId);
        }

        public Conversation AddConversation(Conversation conversation)
        {
            return _conversationRepo.AddConversation(conversation);
        }

        public int CountConversation() {
            var count = _context.Conversations.Count();

            return count;
        }


    }
}