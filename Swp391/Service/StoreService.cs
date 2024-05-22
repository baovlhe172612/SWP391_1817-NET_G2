using Swp391.Dtos;
using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class StoreService
    {
        StoreRepo storeRepo = new StoreRepo();

        // list store
        public List<StoreDtos> getAllStore()
        {
            return storeRepo.getAllStore();
        }

        // // create store service
        // public Store createStoreService(Store store)
        // {
        //     return storeRepo.createStore(store);
        // }
    }
}