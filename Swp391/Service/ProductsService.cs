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

        /// <summary>
        /// hàm trả về 4 sản phẩm mới nhất
        /// </summary>
        
        /// <returns>trả về 4 sản phẩm mới nhất</returns>

        public List<Product> getFourProductNew()
        {
            var listProuctMin = _repo.getAllProduct().OrderByDescending(product => product.ProductId).Take(4).ToList();
            return listProuctMin;
        }


    }
}
