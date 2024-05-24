using Microsoft.AspNetCore.Mvc;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productDtos : ControllerBase
    {
        private ProductCategoryService _productCategoryService = new ProductCategoryService();

        [HttpGet]
        public IActionResult getAllStore()
        {
            var result = _productCategoryService.getAllProductCategoriesService();
            if (result.Count() > 0)
            {
                return Ok(_productCategoryService.getAllProductCategoriesService());

            }
            else
            {
                return BadRequest(new
                {
                    Success = false,
                    Data = result
                });
            }
        }
    }
}