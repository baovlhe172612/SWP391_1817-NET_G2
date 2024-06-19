using BE.Models;
using Swp391.Controllers;
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

        public List<ProductSizeDtos> getProductSimilarPrice(int min, int max, int categoriID)
        {
            List<ProductSizeDtos> productSizeDtos = new List<ProductSizeDtos>();
            productSizeDtos = _repo.GetAllProductSize().Where
                              (p => p.Category != categoriID
                              && p.Price > min && p.Price < max).
                             ToList();
            return productSizeDtos;
        }

        public List<ProductSizeDtos> getFourProductSizeDtosMinPrice()
        {
            List<ProductSizeDtos> productSizeDtos = new();

            productSizeDtos = _repo.GetAllProductSize().OrderBy(p => p.Price).Take(4).ToList();

            return productSizeDtos;
        }

        public List<ProductSizeDtos> getFourProductSizeDtosMaxPrice()
        {
            List<ProductSizeDtos> productSizeDtos = new();

            productSizeDtos = _repo.GetAllProductSize().OrderByDescending(p => p.Price).Take(4).ToList();

            return productSizeDtos;
        }

        public List<ProductSizeDtos> getProductSizeByCategories(int categoriesID)
        {
            List<ProductSizeDtos> listProductSizeByCategory = new() ;

            listProductSizeByCategory = _repo.GetAllProductSize().Where(p => p.Category == categoriesID).ToList() ;

            return listProductSizeByCategory;
        }

        public List<ProductSizeDtos> getProductSizeByPage(int page)
        {
            var products = _repo.GetAllProductSize()
                                    .OrderBy(p => p.ProductId) // Sắp xếp theo ProductID
                                    .Skip((page - 1) * 4)                   // Bỏ qua x hàng đầu tiên
                                    .Take(4)                   // Lấy 4 hàng kế tiếp
                                    .ToList();
            return products;
        }

        public List<int> getSizeCountProductSize()
        {

            List<int> size = new();

            int count = (_repo.GetAllProductSize().Count % 4 == 0) ?
                        (_repo.GetAllProductSize().Count / 4) : (_repo.GetAllProductSize().Count / 4 + 1);

            for (int i = 1; i <= count; i++)
            {
                size.Add(i);
            }
            return size;
        }

        public List<ProductSizeDtos> getProductSizeWithCondition(int condition)
        {
            List<ProductSizeDtos> listProductSizeWithCondition = new();

            switch (condition)
            {
                case 1:
                    {
                        listProductSizeWithCondition = _repo.GetAllProductSize()
                                    .OrderBy(p => p.ProductId) // Sắp xếp theo id

                                    .ToList();
                        break;
                    }
                case 2:
                    {
                        listProductSizeWithCondition = _repo.GetAllProductSize()
                                    .OrderBy(p => p.ProductName) // Sắp xếp theo name

                                    .ToList();
                        break;
                    }
                case 3:
                    {
                        listProductSizeWithCondition = _repo.GetAllProductSize()
                                    .OrderByDescending(p => p.Price) // Sắp xếp theo price giam

                                    .ToList();
                        break;
                    }
                case 4:
                    {
                        listProductSizeWithCondition = _repo.GetAllProductSize()
                                    .OrderBy(p => p.Price) // Sắp xếp theo price tang

                                    .ToList();
                        break;
                    }
            }

            return listProductSizeWithCondition;
        }

        public List<ProductSizeDtos> getProductSizeByCategoryIDAndCondition(int categoriID, int condition)
        {
            List<ProductSizeDtos> listProductByCategoryIDAndCondition = new ();
            switch (condition)
            {
                case 1:
                    {
                        listProductByCategoryIDAndCondition = _repo.GetAllProductSize().Where(p => p.Category == categoriID)
                                    .OrderBy(p => p.ProductId) // Sắp xếp theo id

                                    .ToList();
                        break;
                    }
                case 2:
                    {
                        listProductByCategoryIDAndCondition = _repo.GetAllProductSize().Where(p => p.Category == categoriID)
                                    .OrderBy(p => p.ProductName) // Sắp xếp theo name

                                    .ToList();
                        break;
                    }
                case 3:
                    {
                        listProductByCategoryIDAndCondition = _repo.GetAllProductSize().Where(p => p.Category == categoriID)
                                    .OrderByDescending(p => p.Price) // Sắp xếp theo price giam dan

                                    .ToList();
                        break;
                    }
                case 4:
                    {
                        listProductByCategoryIDAndCondition = _repo.GetAllProductSize().Where(p => p.Category == categoriID)
                                    .OrderBy(p => p.Price) // Sắp xếp theo price tang dan

                                    .ToList();
                        break;
                    }
            }
            return listProductByCategoryIDAndCondition;

        }

        // Create product
        public void CreateProduct(ProductcreateDtos newproduct)
        {
            _repo.CreateProduct(newproduct);
        }
    }
}
