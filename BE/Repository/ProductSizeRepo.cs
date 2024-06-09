using BE.Models;
using Swp391.Dtos;


namespace Swp391.Repository
{
    public class ProductSizeRepo
    {
        /// <summary>
        /// lấy toàn bộ product đi cùng size tại repo
        /// </summary>

        /// <returns>trả về toàn bộ product đi cùng size</returns>

        public List<ProductSizeDtos> GetAllProductSize()

        {

            SwpfinalContext _context = new SwpfinalContext();

            var ProductSize = (from p in _context.Products
                               join ps in _context.ProductSizes on p.ProductId equals ps.ProductId
                               join s in _context.Sizes on ps.SizeId equals s.SizeId
                               select new ProductSizeDtos
                               {
                                  ProductSizeID = ps.ProductSizeId,
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName,
                                  Img = p.Img,
                                  SizeId = ps.SizeId,
                                  SizeName = s.SizeName,
                                  Price = (int)(p.Price + s.Price),
                                  Category = p.CategoryId,
                               }).ToList();

            return ProductSize;
        }
    }
}
