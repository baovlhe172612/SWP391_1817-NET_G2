using BE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private AccountService _service = new AccountService();

        //phương thức này dùng để lấy toàn bộ account
        [HttpGet("manager")]
        public IActionResult GetAllAccounts_manager([FromQuery] string status, [FromQuery] string isDeleted, [FromQuery] string search)
        {
            return Ok(_service.GetAllAccounts_manager( status, isDeleted, search));
        }
        [HttpGet("all")]
        public IActionResult GetAllAccounts()
        {
            return Ok(_service.getAllAccount());
        }
        //lấy account bằng ID
        [HttpGet("{id}")]
        public IActionResult GetAccountById(int id)
        {
            var accountDto = _service.getAccountById(id);

            if (accountDto == null)
            {
                return NotFound(); // Trả về mã trạng thái 404 Not Found nếu không tìm thấy account với ID tương ứng
            }

            return Ok(accountDto); // Trả về account thông qua đối tượng DTO
        }
        //cập nhật trạng thái account    
        [HttpPut("{id}/status")]
        public IActionResult UpdateAccountStatus(int id, [FromQuery] int newStatus)
        {
            _service.UpdateAccountStatus(id, newStatus);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi cập nhật thành công
        }
        // update isdelete

        [HttpPut("{id}/IsDelete")]
        public IActionResult DeleteAccount(int id, [FromQuery] int isdelete)
        {
            _service.updateIsDeleteAccount(id, isdelete);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi tạo account thành công
        }

        // update full account
        [HttpPut("{id}")]
        public IActionResult UpdateAccount([FromBody] Account account)
        {
            if (account == null)
            {
                return BadRequest(new
                {
                    err = "account object is null"
                });
            }
            _service.UpdateAccount(account);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi tạo account thành công
        }
        //Tạo mới account
        [HttpPost]
        public IActionResult CreateAccount([FromBody] Account newAccount)
        {
            if (newAccount == null)
            {
                return BadRequest(new
                {
                    err = "account object is null"
                });
            }

            _service.createrAccount(newAccount);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi tạo account thành công
        }


        //phương thức này dùng để lấy toàn bộ account
        [HttpGet("/employee")]
        public IActionResult getAllAccountEmployee()
        {
            return Ok(_service.GetAllAccountEmployeeDtos());
        }

        //lấy account bằng ID
        [HttpGet("/employee/{id}")]
        public IActionResult GetAccountEmployeeById(int id)
        {
            var accountDto = _service.getAccountEmployeeId(id);

            if (accountDto == null)
            {
                return NotFound(); // Trả về mã trạng thái 404 Not Found nếu không tìm thấy account với ID tương ứng
            }

            return Ok(accountDto); // Trả về account thông qua đối tượng DTO
        }


    }
}
