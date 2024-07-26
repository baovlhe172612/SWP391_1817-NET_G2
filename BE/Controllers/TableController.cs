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
        [HttpPut("updateisDelete/{tableId}")]
        public IActionResult updateIsDelete(int tableId, int isDelete) {
            try { 
                _tableService.updateIsDelete(tableId, isDelete);
                return Ok("success");
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateisStatus/{tableId}")]
        public IActionResult updateIsStatus(int tableId, int status)
        {
            try
            {
                _tableService.updateIsStatus(tableId, status);
                return Ok("success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }                   
}
