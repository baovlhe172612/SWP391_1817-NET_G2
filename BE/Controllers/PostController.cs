using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;


namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private PostService _PostService = new PostService();

        // phương thức lấy toàn bộ table
      

        [HttpGet]
        public IActionResult getFiveEarlyPost()
        {
            return Ok(_PostService.getFivePostEarly());
        }





    }
}
