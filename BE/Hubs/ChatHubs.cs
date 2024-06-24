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
        private MessageService _messageService = new MessageService();

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

        public async Task LeaveStore(string ChatRoom)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, ChatRoom);
            await Clients.Group(ChatRoom).SendAsync("LeaveStore", $"A user has left the store {ChatRoom}");
        }
        public async Task JoinSpecificChatroom(UserChat userChat, string ChatRoom, int UserChatFirstId, int UserSecondId)
        {
            try
            {
                // add người dùng vào ChatRoom
                await Groups.AddToGroupAsync(Context.ConnectionId, ChatRoom);
                // tìm xem người dùng tồn tại hay không
                var userChatBd = _chatService.FindUserPassById(userChat.UserId);

                if (userChatBd == null)
                {
                    // create userChat
                    userChatBd = _chatService.AddUseChat(userChat);
                }

                // Check Conversation
                var conversationExist = _conversationService.FindConversation(UserChatFirstId, UserSecondId);

                // // Tạo Conversation
                if (conversationExist == null)
                {
                    var conversation = new Conversation
                    {
                        ConversationId = 0,
                        UserChatFirstId = UserChatFirstId,
                        UserSecondId = UserSecondId,
                    };

                    conversationExist = _conversationService.AddConversation(conversation);
                }

                // gửi tin nhắn cho MỌI NGƯỜI ( chưa biết gửi tin nhắn cho 1 người)
                await Clients.Group(ChatRoom)
                .SendAsync("JoinSpecificChatroom", userChatBd, ChatRoom, conversationExist);//, conversationExist);
            }
            catch (System.Exception ex)
            {
                // Ghi nhật ký ngoại lệ chi tiết
                Console.WriteLine($"Lỗi trong JoinSpecificChatroom: {ex.ToString()}");

                // Gửi thông báo lỗi chi tiết cho client
                throw new HubException("Failed to invoke 'JoinSpecificChatroom' due to an error on the server.", ex);
            }
        }

        public async Task SendMessage(UserChat userChat, string message, string ChatRoom, Conversation conversation, int SensiderId)
        {
            try
            {
                // Check Conversation
                var conversationExist = _conversationService.FindConversation(conversation.UserChatFirstId, conversation.UserSecondId);

                // Tạo Conversation
                if (conversationExist == null)
                {
                    conversationExist = _conversationService.AddConversation(conversation);
                }

                // Lưu tin nhắn trong DB
                var newMessage = new Message
                {
                    CoverId = conversationExist.ConversationId,
                    SensiderId = SensiderId,
                    ContentChat = message,
                    TimeStamp = DateTime.Now,
                    MessId = 0 // Sửa lại thành tên thuộc tính MessId
                };

                newMessage = _messageService.AddMessage(newMessage);

                // thay đổi trang admin khi có người gửi tin nhắn
                // await GetAllConver(conversationExist.UserSecondId, ChatRoom);

                // gửi tin nhắn đến tất cả người có trong phòng chat
                await Clients.Group(ChatRoom)
                    .SendAsync("ReceiveMessageInput", userChat, ChatRoom, message, conversationExist, newMessage);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Exception in SendMessage: {ex.Message}");
                // Optional: Send a message to the client with error details
                await Clients.Caller.SendAsync("ReceiveMessageError", ex.Message);
            }
        }

        public async Task GetAllConver(int storeId, string chatRoom)
        {
            try
            {
                // add người dùng vào ChatRoom
                await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom);

                // lấy listConversation từ DB
                List<Conversation> listConversation = _conversationService.GetConversationByStoreId(storeId);

                // trả ra list
                await Clients.Group(chatRoom)
                .SendAsync("listConversation", listConversation, chatRoom);
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public async Task SendMessageGroup(string ChatRoom, string message, Conversation conversation)
        {
            // gửi tin nhắn đến tất cả người có trong phòng chat
            await Clients.Group(ChatRoom)
                .SendAsync("ReceiveMessageInputForStore", ChatRoom, message, conversation);
        }

        public async Task JoinStore(string ChatRoom)
        {
            try
            {
                // add người dùng vào ChatRoom
                await Groups.AddToGroupAsync(Context.ConnectionId, ChatRoom);

                await Clients.Group(ChatRoom)
                .SendAsync("JoinStore", ChatRoom);
            }
            catch (System.Exception ex)
            {
                // Ghi nhật ký ngoại lệ chi tiết
                Console.WriteLine($"Lỗi trong JoinSpecificChatroom: {ex.ToString()}");

                // Gửi thông báo lỗi chi tiết cho client
                throw new HubException("Failed to invoke 'JoinSpecificChatroom' due to an error on the server.", ex);
            }
        }
    }

}