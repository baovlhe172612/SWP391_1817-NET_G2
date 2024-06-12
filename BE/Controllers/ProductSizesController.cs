using BE.Models;
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

        //phương thức này dùng để lấy 4 sản phẩm rẻ nhất hiển thị trên trang home
        [HttpGet("getFourProductMin")]
        public IActionResult getFourProductMin()
        {
            List<ProductSizeDtos> productSizeDtos = _service.getFourProductSizeDtosMinPrice();

            if(productSizeDtos == null || productSizeDtos.Count == 0)
            {
                return BadRequest(new
                {
                    err = "no exits product size"
                });
            }
            else
            {
                return Ok(_service.getFourProductSizeDtosMinPrice());
            }
        }
        //phương thức này dùng để lấy 4 sản phẩm đắt nhất hiển thị trên trang home
        [HttpGet("getFourProductMax")]
        public IActionResult getFourProductMax()
        {
            List<ProductSizeDtos> productSizeDtos = _service.getFourProductSizeDtosMaxPrice();

            if (productSizeDtos == null || productSizeDtos.Count == 0)
            {
                return BadRequest(new
                {
                    err = "no exits product size"
                });
            }
            else
            {
                return Ok(_service.getFourProductSizeDtosMaxPrice());
            }
        }

        [HttpGet("getProductSizeByCategoryId")]
        public IActionResult GetListProductSizeByCategoryID(int categoriesID)
        {
            List<ProductSizeDtos> listProductSizeByCategories = _service.getProductSizeByCategories(categoriesID);

            if (listProductSizeByCategories != null && listProductSizeByCategories.Count != 0)
            {
                return Ok(listProductSizeByCategories);
            }

            return BadRequest(new
            {
                mess = "not exits data"
            });
        }

        [HttpGet("getProductSizeByPage")]
        public IActionResult getProductByPage(int page)
        {
            var listProuctSize = _service.getProductSizeByPage(page);

            if (listProuctSize == null)
            {
                return BadRequest(new
                {
                    messgerErr = "page not found"
                });
            }

            return Ok(listProuctSize);
        }

        [HttpGet("getCountProductSize")]
        public IActionResult getCountProduct()
        {
            return Ok(_service.getAllProuctSize().Count);
        }



        [HttpGet("getCountPageProductSize")]
        public IActionResult getCountPageProduct()
        {
            var countPageProduct = _service.getSizeCountProductSize();

            if (countPageProduct == null)
            {
                return BadRequest(new
                {
                    messgerErr = "size = null"
                });
            }

            return Ok(countPageProduct);
        }

        //trả về dữ liệu product với nhiều tiêu chí
        [HttpGet("getProductWithCondition")]
        public IActionResult getProductWithCondition(int condition)
        {

            List<ProductSizeDtos> listProductSizeWithCondition = _service.getProductSizeWithCondition(condition);

            return Ok(listProductSizeWithCondition);
        }

        //trả về dữ liệu với nhiều tiêu chí và theo loại sản phẩm
        [HttpGet("getProductByCategoryIDAndCondition")]
        public IActionResult GetListProductByCategoryIDAndCondition(int categoriID, int condition)
        {
            List<ProductSizeDtos> listProductSizeByCategoriesAndCondition
                = _service.getProductSizeByCategoryIDAndCondition(categoriID, condition);

            if (listProductSizeByCategoriesAndCondition != null
                    && listProductSizeByCategoriesAndCondition.Count != 0)
            {
                return Ok(listProductSizeByCategoriesAndCondition);
            }

            return BadRequest(new
            {
                mess = "not exits data"
            });
        }

        // sản phẩm tương tự trong khoảng min và max
        [HttpGet("getProductSizeSimilarMinToMax")]
        public IActionResult getProductSizeSimilarMinToMax(int min, int max, int categoriID)
        {
            var listProuctSize = _service.getProductSimilarPrice(min, max, categoriID);

            if (listProuctSize == null)
            {
                return BadRequest(new
                {
                    messgerErr = "page not found"
                });
            }

            return Ok(listProuctSize);
        }

        // create product
        [HttpPost("Create")]
        public IActionResult CreateProduct(ProductSizeDtos product)
        {
            try
            {
                _service.CreateProduct(product);
                return Ok(new { message = "Product created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}
