using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;


namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private TableService _tableService = new TableService();

        // phương thức lấy toàn bộ table
        [HttpGet]
        public IActionResult getAllTable()
        {
            return Ok(_tableService.getAllTable());
        }




    }                   
}
