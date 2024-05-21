using Swp391.Models;

namespace Swp391.Repository
{
    public class ProductRepo
    {
        public List<Product> getAllProduct()
        {
            SwpdemoContext context = new SwpdemoContext();
            return context.Products.ToList();
        }
    }
}
