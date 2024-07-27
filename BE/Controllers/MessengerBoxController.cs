using BE.Models;
using Microsoft.AspNetCore.Mvc;

using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessengerBoxController : ControllerBase
    {
        private readonly MessengerBoxService _messengerService = new MessengerBoxService();


        //phương thức này dùng để insert feedback vào trong database
        [HttpPost]
        public IActionResult CreateMessengerBox([FromBody] MessengerBox messengerBox)
        {
            if (messengerBox == null)
            {
                return BadRequest(new
                {
                    err = "Messenger box object is null"
                });
            }

            int size = _messengerService.getAllMess().Count;

            MessengerBox messenger = new MessengerBox
            {
                MessengerBoxId = size + 1,  // Increment ID properly
                Author = messengerBox.Author,
                MessengerDescription = messengerBox.MessengerDescription,
                IsDelete = 1,
                CreateDate = messengerBox.CreateDate,
                StoreId= messengerBox.StoreId

            };
            _messengerService.PostMessUI(messenger);

            return Ok(new
            {
                mess = "add successfully",
                data = messenger
            });
        }


        [HttpGet]
        public IActionResult GetMessengerBox()
        {
            return Ok(_messengerService.getAllMess());
        }


        //
        [HttpGet("{id}")]
        public IActionResult GetMessengerBoxById(int id)
        {
            var messengerBox = _messengerService.GetMessById(id);

            if (messengerBox == null)
            {
                return NotFound(new
                {
                    err = $"Messenger box with ID {id} not found"
                });
            }

            return Ok(messengerBox);
        }

        [HttpPut("{id}/{isDelete}")]
        public IActionResult UpdateIsDelete(int id, int isDelete)
        {
            try
            {
                _messengerService.UpdateIsDelete(id, isDelete);
                return Ok(new { mess = "Update successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { err = ex.Message });
            }
        }
    }
}

