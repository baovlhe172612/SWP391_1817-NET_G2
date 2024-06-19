using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;
using BE.Repository;
using BE.Dtos;

namespace BE.Service
{
    public class MessageService
    {
        private MessageRepo _messageRepo = new MessageRepo();

        public Message AddMessage(Message message)
        {
            return _messageRepo.AddMessage(message);
        }

        public List<MessageDtos> GetMessageByConverId(int converId) {
            return _messageRepo.GetMessageByConverId(converId);
        }

    }
}