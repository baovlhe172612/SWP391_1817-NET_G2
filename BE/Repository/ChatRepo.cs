using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;


namespace BE.Repository
{
    public class ChatRepo
    {
        private SwpfinalContext _context = new SwpfinalContext();

        // Add user chat
        public UserChat AddUseChat(UserChat chat)
        {
            try
            {
                _context.UserChats.Add(chat);

                _context.SaveChanges();

                return chat;
            }
            catch (System.Exception)
            {
                throw;
                return null;
            }
        }
    }
}