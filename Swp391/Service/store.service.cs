using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class StoreService
    {
        StoreRepo storeRepo = new StoreRepo();

        public List<Store> getAllStore()
        {
            return storeRepo.getAllStore();
        }
    }
}