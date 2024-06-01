﻿using BE.Models;
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

            if (listProuctMin == null)
            {
                return BadRequest(new
                {
                    messgerErr = "page not found"
                });
            }

            return Ok(listProuctMin);
        }


        //trả về dữ liệu product với nhiều tiêu chí
        [HttpGet("getProductByPageWithCondition")]
        public IActionResult getProductWithCondition(int condition)
        {

            List<Product> listProductWithCondition = _service.getProductByPageAndCondition(condition);

            return Ok(listProductWithCondition);
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

        

        [HttpGet("searchByPriceRange")]
        public IActionResult SearchProductsByPriceRange(double minPrice, double maxPrice)
        {
            var products = _service.SearchProductsByPriceRange(minPrice, maxPrice);
            if (products == null || products.Count == 0)
            {
                return NotFound("No products found within the given price range.");
            }
            return Ok(products);
        }

        [HttpGet("getProductByCategoryId")]
        public IActionResult GetListProductByCategoryID(int categoriesID)
        {
            List<Product> listProductByCategories = _service.getProductByCategories(categoriesID);

            if(listProductByCategories != null && listProductByCategories.Count != 0)
            {
                return Ok(listProductByCategories);
            }

            return BadRequest(new
            {
                mess="not exits data"
            });
        }

        [HttpGet("getProductByCategoryIDAndCondition")]
        public IActionResult GetListProductByCategoryIDAndCondition(int categoriID, int condition)
        {
            List<Product> listProductByCategoriesAndCondition
                = _service.getProductByCategoryIDAndCondition(categoriID, condition);

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

        [HttpGet("search")]
        public IActionResult GetListProductBySearch(String search)
        {
            List<Product> listProductBySearch = _service.getProductBySearch(search);

            if (listProductBySearch != null
                    && listProductBySearch.Count != 0)
            {
                return Ok(listProductBySearch);
            }

            return BadRequest(new
            {
                mess = "not exits data"
            });

        }
    }
}
