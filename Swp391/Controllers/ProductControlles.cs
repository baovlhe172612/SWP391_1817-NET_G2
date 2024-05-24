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


        //phương thức này dùng để lấy toàn bộ sản phẩm
        [HttpGet]
        public IActionResult getAllProduct()
        {
            return Ok(_service.getAllprouct());
        }

        //phương thức này dùng để lấy tổng số lượng sản phẩm
        [HttpGet("getCountProduct")]
        public IActionResult getCountProduct()
        {
            return Ok(_service.getAllprouct().Count);
        }

        //phương thức này dùng để lấy 4 sản phẩm rẻ nhất hiển thị trên trang home
        [HttpGet("getFourProductMin")]
        public IActionResult getFourProductMin()
        {

            return Ok(_service.getFourProductMin());
        }

        //phương thức này dùng để lấy 4 sản phẩm mới nhất hiển thị trên trang home
        [HttpGet("getFourProductNew")]
        public IActionResult getThreeProduct()
        {
            var listProuctMin = _service.getFourProductNew();
            return Ok(listProuctMin);
        }

        [HttpGet("getProductByPage")]
        public IActionResult getProductByPage(int page)
        {
            var listProuctMin = _service.getProductByPage(page);

            if(listProuctMin == null)
            {
                return BadRequest(new
                {
                    messgerErr = "page not found" 
                });
            }

            return Ok(listProuctMin);
        }

        [HttpGet("getCountPageProduct")]
        public IActionResult getCountPageProduct()
        {
            var countPageProduct = _service.getSizeCountProduct();

            if (countPageProduct == null)
            {
                return BadRequest(new
                {
                    messgerErr = "size = null"
                });
            }

            return Ok(countPageProduct);
        }
    }
}
