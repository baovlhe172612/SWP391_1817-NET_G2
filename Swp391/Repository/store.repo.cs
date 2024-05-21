using Swp391.Models;

namespace Swp391.Repository
{
    // thao tác với dữ liệu ở đây
    public class StoreRepo
    {
        public List<Store> getAllStore()
        {
            SwpdemoContext context = new SwpdemoContext();
            return context.Stores.ToList();
        }
    }
}