using Swp391.Dtos;
using Swp391.Repository;

namespace Swp391.Service
{
    public class ProductSizeService
    {
        private ProductSizeRepo _repo = new ProductSizeRepo();

        /// <summary>
        /// lấy toàn bộ product đi cùng size tại repo
        /// </summary>

        /// <returns>trả về toàn bộ product đi cùng size</returns>
        public List<ProductSizeDtos> getAllProuctSize()
        {
            return _repo.GetAllProductSize();
        }

        public ProductSizeDtos getProductSizeByIdAndSize(int productId, int sizeId)
        {
            var productSizeDto = _repo.GetAllProductSize()
                                     .FirstOrDefault(pID => pID.ProductId == productId && pID.SizeId == sizeId);

            return productSizeDto;
        }
    }
}
