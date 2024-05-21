using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductControlles : ControllerBase
    {
        private ProductsService _service = new ProductsService();

        [HttpGet]
        public IActionResult getAllProduct()
        {
            return Ok(_service.getAllProductUI());
        }
    }
}
