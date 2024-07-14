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

        // Get Account by Email controller
        [HttpGet("GetByEmail")]
        public IActionResult GetAccountByEmail(string email)
        {
            var accountDtosByEmail = _accountDtosService.GetAccDtosByEmailSer(email);

            if (accountDtosByEmail != null)
            {
                return Ok(accountDtosByEmail);
            }
            else
            {
                return BadRequest(accountDtosByEmail);
            }
        }

       /* [HttpGet("forget_password")]
        public async Task<IActionResult> forgetPassword(CancellationToken cancellationToken, string email)
        {
            var user =  _accountDtosService.GetAccDtosByEmailSer(email);  


        }*/
    }
}
  