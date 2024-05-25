using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;


namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private CategoryService _CategoryService = new CategoryService();

        // phương thức lấy toàn bộ table
        [HttpGet]
        public IActionResult getAllCategory()
        {
            return Ok(_CategoryService.getAllCategory());
        }




    }
}
