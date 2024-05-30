using Microsoft.AspNetCore.Mvc;
using Swp391.Service;
using Swp391.Models;
using System.Collections.Generic;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        CategoryService _categoryService = new CategoryService();

        

        [HttpGet]
        public IActionResult GetAllCategory()
        {
           
            return Ok(_categoryService.getAllCategory());
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoryByID(int id)
        {
           var category = _categoryService.GetCategoryById(id);
            if (category != null)
            {
                return Ok(category);
            }
            return null;
        }

        [HttpPost("add_new/")]
        public IActionResult AddCategory([FromBody] Category category)
        {
            _categoryService.AddCategory(category);
            return CreatedAtAction(nameof(GetAllCategory), new { id = category.CategoryId }, category);

        }

        [HttpPatch("update/{id}")]
        public IActionResult UpdateCategory(int id, Category category)
        {
            if (category!=null && id == category.CategoryId)
            {
                
                _categoryService.UpdateCategory(category);
                return Ok(category);
            }
            return BadRequest();

            
        }

        [HttpPatch("delete/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var newCategory = _categoryService.DeleteCategory(id, 1);

            if(newCategory != null)
            {
                return Ok(newCategory);
            }

            return BadRequest();
        }
    }
}
