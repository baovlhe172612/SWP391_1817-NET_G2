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
    public class messages: ControllerBase
    {
        private MessageService _messageService = new MessageService();

        [HttpGet("{converId}")]
         public IActionResult GetAllMessage(int converId) {
            return Ok(_messageService.GetMessageByConverId(converId));
        }
    }
}