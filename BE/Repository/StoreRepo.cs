using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swp391.Models;

namespace Swp391.Repository
{
    public class StoreRepo
    {
        /// <summary>
        /// Thao tác với Models Store => tạo store mới
        /// </summary>
        private SwpfinalContext _context = new SwpfinalContext();

        public void createStore(Store store)
        {
            _context.Stores.Add(store);

            _context.SaveChanges();
        }

        /// <summary>
        /// Update IsDelete
        /// </summary>
        public void UpdateStore(Store store)
        {
            // Cập nhật cửa hàng trong context
            _context.Stores.Update(store);

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges();
        }

        /// <summary>
        /// Update all store
        /// </summary>
        public void UpdateStoreAdminRepo(Store store) {
            // Cập nhật Store trong context
            _context.Stores.Update(store);

            // Lưu thay đổi vào DB
            _context.SaveChanges();
        }
     }
}