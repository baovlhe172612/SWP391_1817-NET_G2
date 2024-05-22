using Microsoft.AspNetCore.Mvc;
using Swp391.Models;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessengerBoxController : ControllerBase
    {
        private readonly MessengerBoxService _messengerService;

        public MessengerBoxController(MessengerBoxService messengerService)
        {
            _messengerService = messengerService;
        }

        [HttpPost]
        public IActionResult CreateMessengerBox(MessengerBox messengerBox)
        {
            if (messengerBox == null)
            {
                return BadRequest("Messenger box object is null");
            }
            else
            {
                _messengerService.PostMessUI(messengerBox);

                return Ok("Messenger box created successfully");
            }

            
        }

        // Các phương thức khác của controller có thể được thêm vào ở đây
    }
}
