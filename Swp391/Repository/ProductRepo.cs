using Swp391.Models;

namespace Swp391.Repository
{
    public class ProductRepo
    {
        public List<Product> getAllProduct()
        {
            SwpfinalContext context = new SwpfinalContext();
            return context.Products.ToList();
        }



    }
}
