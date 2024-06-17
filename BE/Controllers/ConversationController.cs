using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BE.Dtos;
using BE.Models;
using BE.Service;

namespace BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class conversations: ControllerBase
    {
        private ConversationService _conversationService = new ConversationService();
        
        [HttpGet("{storeId}")] 
        public IActionResult GetAllConversations(int storeId) {
            return Ok(_conversationService.GetConversationByStoreId(storeId));
        }
    }
}