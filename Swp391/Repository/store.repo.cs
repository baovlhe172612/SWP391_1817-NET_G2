using Swp391.Models;

namespace Swp391.Repository
{
    // thao tác với dữ liệu ở đây
    public class StoreRepo
    {
        // get all store
        public List<Store> getAllStore()
        {
            SwpdemoContext context = new SwpdemoContext();
            // câu lệnh để select data
            return context.Stores.ToList();
        }

        // create store
        public Store createStore(Store store)
        {
            SwpdemoContext context = new SwpdemoContext();
            // câu lệnh insert vào db

            // add store
            context.Stores.Add(store);

            return store;
        }
    }
}