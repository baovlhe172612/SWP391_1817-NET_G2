using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountControllers : ControllerBase
    {
        private AccountService _service = new AccountService();

        //phương thức này dùng để lấy toàn bộ account
        [HttpGet]
        public IActionResult getAllAccount()
        {
            return Ok(_service.GetAllAccountDtos());
        }
    }
}
