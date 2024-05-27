using Microsoft.EntityFrameworkCore;
using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class ProductsService
    {
        ProductRepo _repo = new ProductRepo();

        /// <summary>
        /// lấy toàn bộ sản phẩm bằng service
        /// </summary>

        /// <returns>trả về toàn bộ sản phẩm</returns>
        public List<Product> getAllprouct()
        {
            return _repo.getAllProduct();
        }

        /// <summary>
        /// trả về 4 sản phẩm có giá rẻ nhất
        /// </summary>

        /// <returns>trả về 4 sản phẩm</returns>

        public List<Product> getFourProductMin()
        {
            var listProuctMin = _repo.getAllProduct().OrderBy(product => product.Price).Take(4).ToList();
            return listProuctMin;
        }

        public List<Product> getFourProductMax()
        {
            var listProuctMin = _repo.getAllProduct().OrderBy(product => product.Price).Take(4).ToList();
            return listProuctMin;
        }

        /// <summary>
        /// hàm trả về 4 sản phẩm mới nhất
        /// </summary>

        /// <returns>trả về 4 sản phẩm mới nhất</returns>

        public List<Product> getFourProductNew()
        {
            var listProuctMin = _repo.getAllProduct().OrderByDescending(product => product.ProductId).Take(4).ToList();
            return listProuctMin;
        }


        /// <summary>
        /// trả về tổng số lượng sản phẩm
        /// </summary>

        /// <returns>hàm trả về tổng số lượng sản phẩm</returns>
        public List<int> getSizeCountProduct()
        {

            List<int> size = new(); 

            int count = (_repo.getAllProduct().Count % 4 == 0) ? 
                        (_repo.getAllProduct().Count / 4) : (_repo.getAllProduct().Count / 4 + 1);

            for (int i = 1; i <= count; i++)
            {
                size.Add(i);
            }
            return size;
        }

        /// <summary>
        /// hàm trả về 4 sản phẩm liên tiếp theo theo chỉ số phân trang truyền vào
        /// </summary>

        /// <returns>hàm trả về 4 sản phẩm liên tiếp theo theo chỉ số truyền vào</returns>
        public List<Product> getProductByPage(int page)
        {
            var products = _repo.getAllProduct()
                                    .OrderBy(p => p.ProductId) // Sắp xếp theo ProductID
                                    .Skip((page - 1) * 4)                   // Bỏ qua x hàng đầu tiên
                                    .Take(4)                   // Lấy 4 hàng kế tiếp
                                    .ToList();
            return products;
        }

        /// <summary>
        /// hàm sort sản phẩm
        /// </summary>

        /// <returns>hàm trả về sản phẩm được sort theo tiêu chí</returns>
        public List<Product> getProductByPageAndCondition(int condition)
        {
            List<Product> listProductWithCondition = new();

            switch (condition)
            {
                case 1:
                    {
                        listProductWithCondition = _repo.getAllProduct()
                                    .OrderBy(p => p.ProductId) // Sắp xếp theo ProductID
                                    
                                    .ToList();
                        break;
                    }
                case 2:
                    {
                        listProductWithCondition = _repo.getAllProduct()
                                    .OrderBy(p => p.ProductName) // Sắp xếp theo ProductID
                                    
                                    .ToList();
                        break;
                    }
                case 3:
                    {
                        listProductWithCondition = _repo.getAllProduct()
                                    .OrderByDescending(p => p.Price) // Sắp xếp theo ProductID
                                    
                                    .ToList();
                        break;
                    }
                case 4:
                    {
                        listProductWithCondition = _repo.getAllProduct()
                                    .OrderBy(p => p.Price) // Sắp xếp theo ProductID
                                 
                                    .ToList();
                        break;
                    }
            }
            
            return listProductWithCondition;
        }
        /// <summary>
        /// Tìm kiếm sản phẩm theo tên
        /// </summary>
        /// <param name="keyword">Tên sản phẩm hoặc một phần tên sản phẩm</param>
        /// <returns>Danh sách sản phẩm khớp với từ khóa</returns>
        public List<Product> searchProductsByName(string keyword)
        {
            return _repo.searchProductsByName(keyword);
        }

        public List<Product> SearchProductsByPriceRange(double minPrice, double maxPrice)
        {
            return _repo.SearchProductsByPriceRange(minPrice, maxPrice);
        }
    }
}
