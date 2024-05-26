using Swp391.Models;

namespace Swp391.Repository
{
    public class ProductRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ sản phẩm của repository products
        /// </summary>
       
        /// <returns>toàn bộ sản phẩm</returns>
        public List<Product> getAllProduct()
        {
            SwpfinalContext context = new SwpfinalContext();
            return context.Products.ToList();
        }



    }
}
