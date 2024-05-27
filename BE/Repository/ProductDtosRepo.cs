using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using swp391.Dtos;
using Swp391.Dtos;
using Swp391.Models;

namespace Swp391.Repository
{
    public class ProductDtosRepo
    {
        public List<ProductCategoryDtos> getAllProductDtos()
        {

            SwpfinalContext _context = new SwpfinalContext();

            var newProductDtos = (from p in _context.Products
                                  join c in _context.Categories on p.CategoryId equals c.CategoryId
                                  select new ProductCategoryDtos
                                  {
                                      ProductId = p.ProductId,
                                      ProductName = p.ProductName,
                                      ModifileDate = p.ModifileDate,
                                      CreateDate = p.CreateDate,
                                      Img = p.Img,
                                      CategoryId = p.CategoryId,
                                      Price = p.Price,
                                      CategoryName = c.CategoryName,
                                      IsDelete = c.IsDelete,
                                  }).ToList();

            return newProductDtos;
        }
    }
}