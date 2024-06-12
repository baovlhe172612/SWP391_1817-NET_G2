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
                               join c in _context.Categories on p.CategoryId equals c.CategoryId
                               /*join st in _context.Stores on p.StoreId equals st.StoreId*/
                               select new ProductSizeDtos
                               {
                                  ProductSizeID = ps.ProductSizeId,
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName,
                               /*StoreId=p.StoreId,*/
                                  Img = p.Img,
                                  SizeId = s.SizeId,
                                  SizeName = s.SizeName,
                                  Price = (int)(p.Price + s.Price),
                                  Category = p.CategoryId,
                                  IsDelete= ps.IsDelete,
                                  CategoryName=c.CategoryName,
                                  Quantity=ps.Quanity,
                                  /*StoreName=st.StoreName,*/
                               }).ToList();
            return ProductSize;
        }
    }
}
