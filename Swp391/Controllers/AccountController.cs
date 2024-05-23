using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Models;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private AccountService _service = new AccountService();

        //phương thức này dùng để lấy toàn bộ account
        [HttpGet]
        public IActionResult getAllAccount()
        {
            return Ok(_service.GetAllAccountDtos());
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
        [HttpPut("{id}")]
        public IActionResult UpdateAccountStatus(int id, int newStatus)
        {
            _service.UpdateAccountStatus(id, newStatus);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi cập nhật thành công
        }
        //Tạo mới account

        [HttpPost]
        public IActionResult CreateAccount([FromBody] Account newAccount)
        {
            _service.createrAccount(newAccount);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi tạo account thành công
        }
        // Xoá tài khoản
        [HttpDelete("{id}")]
        public IActionResult DeleteAccount(int id)
        {
           _service.deleteAccount(id);

            return Ok(); // Trả về mã trạng thái 200 OK sau khi tạo account thành công
        }


    }
}
