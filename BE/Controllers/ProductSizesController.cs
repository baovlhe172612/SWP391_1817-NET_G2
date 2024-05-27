using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Dtos;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSizesController : ControllerBase
    {

        private ProductSizeService _service = new ProductSizeService();

        [HttpGet]
        public IActionResult getAllProductSize()
        {
            return Ok(_service.getAllProuctSize());
        }

        [HttpGet("productSize")]
        public IActionResult GetProductSizeByIdAndSize([FromQuery] int productId, [FromQuery] int sizeId)
        {
            ProductSizeDtos productSizeDtos = _service.getProductSizeByIdAndSize(productId, sizeId);
            if(productSizeDtos == null)
            {
                return BadRequest(new
                {
                    err="no exits product size"
                });
            }
            else
            {
                return Ok(productSizeDtos);
            }
        }

    }
}
