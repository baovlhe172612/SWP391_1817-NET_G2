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
            return Ok(_service.getAllprouct());
        }

        [HttpGet("getFourProductMin")]
        public IActionResult getFourProductMin()
        {

            var listProuctMin = _service.getAllprouct().OrderBy(product => product.Price).Take(4).ToList();
            return Ok(listProuctMin);
        }

        [HttpGet("getFourProductNew")]
        public IActionResult getThreeProduct()
        {

            var listProuctMin = _service.getAllprouct().OrderByDescending(product => product.ProductId).Take(4).ToList();
            return Ok(listProuctMin);
        }
    }
}
