using Swp391.Dtos;
using Swp391.Models;

namespace Swp391.Repository
{
    // thao tác với dữ liệu ở đây
    public class StoreDtosRepo
    {
        /// <summary>
        /// Thao tác với obj StoreDtos => lấy hết list storeDtos
        /// </summary>
        public List<StoreDtos> getAllStore()
        {
            SwpfinalContext _context = new SwpfinalContext();

            // câu lệnh join Stores và Accounts
            var storeWithAccount = (from s in _context.Stores
                                    join a in _context.Accounts on s.AccountId equals a.AccountId
                                    select new StoreDtos
                                    {
                                        StoreId = s.StoreId,
                                        StoreName = s.StoreName,
                                        Location = s.Location,
                                        AccountId = s.AccountId,
                                        UserName = a.UserName,
                                        Email = a.Email,
                                        Phone = a.Phone,
                                        Status = a.Status,
                                        IsDelete = s.IsDelete,
                                        RoleId = a.RoleId
                                    }
                                        ).ToList();
            // câu lệnh để select data
            return storeWithAccount;
        }

        // create store
        // public Store createStore(Store store)
        // {
        //     SwpfinalContext context = new SwpfinalContext();
        //     // câu lệnh insert vào db

        //     // add store
        //     context.Stores.Add(store);

        //     return store;
        // }
    }
}