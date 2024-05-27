using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;
using Swp391.Dtos;


namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountDtos : ControllerBase
    {
        private AccountDtosService _accountDtosService = new AccountDtosService();
        // api/AccountDtos/GET => check userName + password
        [HttpGet("GET")]
        public IActionResult GetBasicAuth(string username, string password)
        {
            var accountDtosByAuthen = _accountDtosService.GetAccountDtosService(username, password);

            if (accountDtosByAuthen != null)
            {
                return Ok(accountDtosByAuthen);

            }
            else
            {
                return BadRequest(accountDtosByAuthen);
            }
        }

        // Get Account by Token controller
        [HttpGet("GET/{token}")]
        public IActionResult GetAccountByToken(string token)
        {
            var accountDtosByToken = _accountDtosService.GetAccDtosByTokenSer(token);

            if (accountDtosByToken != null)
            {
                return Ok(accountDtosByToken);

            }
            else
            {
                return BadRequest(accountDtosByToken);
            }
        }
    }
}