using Microsoft.EntityFrameworkCore;
using Swp391.Models;

namespace Swp391.Repository
{
    public class ProductRepo
    {
        SwpfinalContext context = new SwpfinalContext();
        /// <summary>
        /// hàm trả về toàn bộ sản phẩm của repository products
        /// </summary>

        /// <returns>toàn bộ sản phẩm</returns>
        public List<Product> getAllProduct()
        {
           
            return context.Products.ToList();
        }
        /// <summary>
        /// Tìm kiếm sản phẩm theo tên
        /// </summary>
        /// <param name="keyword">Từ khóa tìm kiếm</param>
        /// <returns>Danh sách sản phẩm khớp với từ khóa (hoặc toàn bộ sản phẩm nếu từ khóa rỗng)</returns>
        public List<Product> searchProductsByName(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                // Nếu từ khóa rỗng, trả về toàn bộ sản phẩm
                return getAllProduct();
            }
            else
            {
                // Nếu từ khóa không rỗng, thực hiện tìm kiếm sản phẩm theo từ khóa
                return context.Products
                               .Where(p => p.ProductName.Contains(keyword))
                               .ToList();
            }
        }
        // Tìm kiếm sản phẩm theo khoảng giá
        public List<Product> SearchProductsByPriceRange(Double minPrice, Double maxPrice)
        {
            // Thực hiện tìm kiếm sản phẩm theo khoảng giá
            return context.Products
                           .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                           .ToList();
        }



    }
}
