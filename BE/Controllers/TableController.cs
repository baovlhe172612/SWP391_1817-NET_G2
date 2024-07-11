using BE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;


namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class tables : ControllerBase
    {
        private TableService _tableService = new TableService();

        // phương thức lấy toàn bộ table
        [HttpGet("store/{storeID}")]
        public IActionResult getAllTable(int storeID)
        {
            return Ok(_tableService.getAllTable(storeID));
        }

        [HttpPost("AddTable")]
        public IActionResult createTable(Table table)
        {
            _tableService.addTable(table);
            return Ok(new
            {
                mess = "Add sucessfully"
            });
        }
    }                   
}
