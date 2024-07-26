using BE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Dtos;
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
            return Ok(_service.GetAllProducts);
        }

        


        
       

        [HttpGet("getProductByCategoryIDAndCondition")]
        public IActionResult GetListProductByCategoryIDAndCondition(int categoriID, int condition)
        {
            List<Product> listProductByCategoriesAndCondition
                = _service.GetProductByCategoryIDAndCondition(categoriID, condition);

            if (listProductByCategoriesAndCondition != null 
                    && listProductByCategoriesAndCondition.Count != 0)
            {
                return Ok(listProductByCategoriesAndCondition);
            }

            return BadRequest(new
            {
                mess = "not exits data"
            });
        }

       



    }
}
