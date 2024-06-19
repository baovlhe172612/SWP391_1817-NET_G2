using BE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;
using Swp391.Dtos;
using BE.Dtos;
using Azure.Core;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private PostService _PostService = new PostService();

        // phương thức lấy toàn bộ table

        [HttpGet]
        public IActionResult GetAllPost()
        {

            return Ok(_PostService.getAllPost());
        }

        [HttpGet("lastest_post/")]
        public IActionResult getFiveEarlyPost()
        {
            return Ok(_PostService.getFivePostEarly());
        }



        [HttpPost("add_new")]
        public IActionResult AddPost([FromBody] Post post)
        {
            try
            {



                // Ensure your _PostService.AddPost method is correct
                _PostService.AddPost(post);

                return Ok(post);
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Internal server error: {ex.Message}");

                // Return the error response
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPatch("update_post/{id}")]
        public IActionResult UpdatePost(int id, Post post)
        {
            if (post != null && id == post.PostId)
            {

                _PostService.UppdatePost(post);
                return Ok(post);
            }
            return BadRequest();

        }

        [HttpPatch("delete_post/{id}")]
        public IActionResult DeletePost(int id)
        {
            var newPost1 = _PostService.DeletePost(id); 

            if (newPost1 != null)
            {
                return Ok(newPost1);
            }
            

            return BadRequest();
        }


        [HttpPatch("up_post/{id}")]
        public IActionResult UpPost(int id)
        {
            var newPost1 = _PostService.UpPost(id, 1);
           
            if (newPost1 != null)
            {
                return Ok(newPost1);
            }
           

            return BadRequest();
        }




    }
}
