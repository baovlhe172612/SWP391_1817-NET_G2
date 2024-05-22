using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class ProductsService
    {
        ProductRepo _repo = new ProductRepo();

        public List<Product> getAllprouct()
        {
            return _repo.getAllProduct();
        }

        public List<Product> getFourProductMin()
        {
            var listProuctMin = _repo.getAllProduct().OrderBy(product => product.Price).Take(4).ToList();
            return listProuctMin;
        }
    }
}
