using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class StoreService
    {
        private SwpfinalContext _context = new SwpfinalContext();
        /// <summary>
        /// hàm trả về store mới được tạo
        /// </summary>
        private StoreRepo storeRepo = new StoreRepo();
        public Store createStoreService(Store store)
        {
            storeRepo.createStore(store);

            return store;
        }

        // find store theo id
        public Store FindStoreById(int id)
        {
            // CS897 
            // đợi thằng này làm xong thì mới làm tiếp => await
            // FirstOrDefault => trả về OBJ đầu tiên theo điều kiện, nếu ko có => null
            return _context.Stores.FirstOrDefault(s => s.StoreId == id);
        }

        // CS1002: ; => LỖI THIẾU DẤU ;

        // Update Store theo service
        public Store UpdateStoreService(int id, int isDelete)
        {
            // Tìm xem có tồn tại Store theo id ko ?
            var storeExist = FindStoreById(id);

            if (storeExist != null)
            {
                storeExist.IsDelete = isDelete;
                // Gọi Repo vì Repo mới có thể can thiệp vào dữ liệu
                storeRepo.UpdateStore(storeExist);
                //
                return storeExist;
            }

            return null;
        }
    }
}