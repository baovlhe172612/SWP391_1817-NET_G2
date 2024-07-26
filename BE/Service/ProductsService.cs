using BE.Models;
using Microsoft.EntityFrameworkCore;
using Swp391.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Swp391.Service
{
    public class ProductsService
    {
        ProductRepo _repo = new ProductRepo();

        /// <summary>
        /// Retrieves all products.
        /// </summary>
        /// <returns>A list of all products.</returns>
        public List<Product> GetAllProducts()
        {
            return _repo.getAllProduct();
        }

        /// <summary>
        /// Retrieves the four products with the lowest price.
        /// </summary>
        /// <returns>A list of four products with the lowest price.</returns>
        public List<Product> GetFourCheapestProducts()
        {
            return _repo.getAllProduct()
                        .OrderBy(product => product.Price)
                        .Take(4)
                        .ToList();
        }

        /// <summary>
        /// Retrieves the four products with the highest price.
        /// </summary>
        /// <returns>A list of four products with the highest price.</returns>
        public List<Product> GetFourMostExpensiveProducts()
        {
            return _repo.getAllProduct()
                        .OrderByDescending(product => product.Price)
                        .Take(4)
                        .ToList();
        }

        /// <summary>
        /// Retrieves the four newest products.
        /// </summary>
        /// <returns>A list of four newest products.</returns>
        public List<Product> GetFourNewestProducts()
        {
            return _repo.getAllProduct()
                        .OrderByDescending(product => product.ProductId)
                        .Take(4)
                        .ToList();
        }

        /// <summary>
        /// Retrieves the total count of products, divided by pages of size 4.
        /// </summary>
        /// <returns>A list of integers representing the number of pages.</returns>
        public List<int> GetSizeCountProduct()
        {
            int count = (_repo.getAllProduct().Count + 3) / 4;
            return Enumerable.Range(1, count).ToList();
        }

        /// <summary>
        /// Retrieves products for a specific page.
        /// </summary>
        /// <param name="page">The page number to retrieve products for.</param>
        /// <returns>A list of products for the specified page.</returns>
        public List<Product> GetProductByPage(int page)
        {
            return _repo.getAllProduct()
                        .OrderBy(p => p.ProductId)
                        .Skip((page - 1) * 4)
                        .Take(4)
                        .ToList();
        }

        /// <summary>
        /// Retrieves products sorted by a specific condition.
        /// </summary>
        /// <param name="condition">The sorting condition: 1 for ProductId, 2 for ProductName, 3 for descending Price, 4 for ascending Price.</param>
        /// <returns>A list of products sorted by the specified condition.</returns>
        public List<Product> GetProductByPageAndCondition(int condition)
        {
            return condition switch
            {
                1 => _repo.getAllProduct().OrderBy(p => p.ProductId).ToList(),
                2 => _repo.getAllProduct().OrderBy(p => p.ProductName).ToList(),
                3 => _repo.getAllProduct().OrderByDescending(p => p.Price).ToList(),
                4 => _repo.getAllProduct().OrderBy(p => p.Price).ToList(),
                _ => new List<Product>()
            };
        }

        /// <summary>
        /// Searches for products by price range.
        /// </summary>
        /// <param name="minPrice">The minimum price.</param>
        /// <param name="maxPrice">The maximum price.</param>
        /// <returns>A list of products within the specified price range.</returns>
        public List<Product> SearchProductsByPriceRange(double minPrice, double maxPrice)
        {
            return _repo.SearchProductsByPriceRange(minPrice, maxPrice);
        }

        /// <summary>
        /// Retrieves products by category ID.
        /// </summary>
        /// <param name="categoryID">The category ID to filter products by.</param>
        /// <returns>A list of products belonging to the specified category.</returns>
        public List<Product> GetProductByCategory(int categoryID)
        {
            return _repo.getAllProduct().Where(p => p.CategoryId == categoryID).ToList();
        }

        /// <summary>
        /// Retrieves products by category ID and sorted by a specific condition.
        /// </summary>
        /// <param name="categoryID">The category ID to filter products by.</param>
        /// <param name="condition">The sorting condition: 1 for ProductId, 2 for ProductName, 3 for descending Price, 4 for ascending Price.</param>
        /// <returns>A list of products filtered by category and sorted by the specified condition.</returns>
        public List<Product> GetProductByCategoryIDAndCondition(int categoryID, int condition)
        {
            return condition switch
            {
                1 => _repo.getAllProduct().Where(p => p.CategoryId == categoryID).OrderBy(p => p.ProductId).ToList(),
                2 => _repo.getAllProduct().Where(p => p.CategoryId == categoryID).OrderBy(p => p.ProductName).ToList(),
                3 => _repo.getAllProduct().Where(p => p.CategoryId == categoryID).OrderByDescending(p => p.Price).ToList(),
                4 => _repo.getAllProduct().Where(p => p.CategoryId == categoryID).OrderBy(p => p.Price).ToList(),
                _ => new List<Product>()
            };
        }

        /// <summary>
        /// Searches for products by name.
        /// </summary>
        /// <param name="search">The search keyword for product names.</param>
        /// <returns>A list of products that match the search keyword.</returns>
        public List<Product> SearchProductsByName(string search)
        {
            return _repo.searchProductsByName(search);
        }
    }
}
