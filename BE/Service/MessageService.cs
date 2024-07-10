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
        private ConversationRepo _conversationRepo = new ConversationRepo();

        public Message AddMessage(Message message)
        {
            return _messageRepo.AddMessage(message);
        }

        public List<MessageDtos> GetMessageByConverId(int converId)
        {
            return _messageRepo.GetMessageByConverId(converId);
        }

        public bool DeleteAllMessage(int storeId, int tableId)
        {
            var conversation = _conversationRepo.GetConverByStoreIdAndTable(tableId, storeId);
            if (conversation != null)
            {
                return _messageRepo.DeleteMessage(conversation.ConversationId);
            }
            return false;
        }

        public bool DeleteAllMessageInStore(int storeId)
        {
            const existConversation = _conversationRepo.ExistConversation(storeId);
            if (existConversation != null)
            {
                var listConversation = _conversationRepo.GetConversationByStoreId(storeId);
                if (listConversation != null)
                {
                    return _messageRepo.DeleteAllMessageInStore(listConversation);
                }
            }

            return false;
        }

    }
}