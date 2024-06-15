using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using BE.Models;
using BE.Service;

namespace BE.Hubs
{
    public class ChatHubs : Microsoft.AspNetCore.SignalR.Hub
    {
        private ChatService _chatService = new ChatService();
        private ConversationService _conversationService = new ConversationService();
        public async Task JoinChat(UserChat userChat)
        {
            try
            {
                // logic
                // Clients.All: Gửi tới tất cả client
                // SendAsync: Đây là phương thức gửi tin nhắn từ server tới client. Nó cho phép bạn gửi dữ liệu tới một hoặc nhiều client.
                // ReceiveMessage: Đây là tên của phương thức ở phía client mà bạn muốn gọi. 
                //     Khi client nhận được tin nhắn này, nó sẽ gọi phương thức ReceiveMessage để xử lý dữ liệu nhận được.
                await Clients.All.SendAsync("ReceiveMessage", userChat);
            }
            catch (Exception ex)
            {
                // Ghi log hoặc xử lý ngoại lệ theo ý của bạn
                Console.WriteLine($"Error in JoinChat: {ex.Message}");
                throw; // Ném lại ngoại lệ để SignalR ghi lại thông báo lỗi cho client
            }
        }

        public async Task JoinSpecificChatroom(UserChat userChat, string ChatRoom)
        {
            // add người dùng vào ChatRoom
            await Groups.AddToGroupAsync(Context.ConnectionId, ChatRoom);

            // thêm người dùng vào DB
            userChat.UserId = userChat.UserId * 100;

            var userChatBd = _chatService.FindUserPassById(userChat.UserId);

            if (userChatBd == null)
            {
                userChatBd = _chatService.AddUseChat(userChat);
            }

            // gửi tin nhắn cho MỌI NGƯỜI ( chưa biết gửi tin nhắn cho 1 người)
            await Clients.Group(ChatRoom)
            .SendAsync("JoinSpecificChatroom", userChatBd, ChatRoom);
        }

        public async Task SendMessage(UserChat userChat, string message, string ChatRoom, Conversation conversation)
        {
            try
            {
                // Check Conversation
                var conversationExist = _conversationService.FindConversation(conversation.UserChatFirstId, conversation.UserSecondId);

                
                // Tạo Conversation
                if (conversationExist == null)
                {
                    // var newConversation = new Conversation
                    // {
                    //     UserChatFirstId = conversation.UserChatFirstId,
                    //     UserSecondId = conversation.UserSecondId,
                    // };

                    conversation = _conversationService.AddConversation(conversation);
                }

                // Lưu tin nhắn trong DB

                // gửi tin nhắn đến tất cả người có trong phòng chat
                await Clients.Group(ChatRoom)
                    .SendAsync("ReceiveMessageInput", userChat, ChatRoom, message, conversation);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Exception in SendMessage: {ex.Message}");
                // Optional: Send a message to the client with error details
                await Clients.Caller.SendAsync("ReceiveMessageError", ex.Message);
            }
        }

    }
}
