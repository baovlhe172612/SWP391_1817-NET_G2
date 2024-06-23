using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using swp391.Dtos;
using Swp391.Dtos;
using Swp391.Repository;

namespace Swp391.Service
{
    public class ProductCategoryService
    {
        private ProductDtosRepo productDtosRepo = new ProductDtosRepo();
        public List<ProductCategoryDtos> getAllProductCategoriesService()
        {
            return productDtosRepo.getAllProductDtos();
        }
    }
}