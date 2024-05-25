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

        public List<Store> getAllStore()
        {
            SwpfinalContext context = new SwpfinalContext();
            return context.Stores.ToList();
        }

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
            try
            {
                var existingStore = _context.Stores.Local.FirstOrDefault(s => s.StoreId == store.StoreId)
                ?? _context.Stores.Attach(store).Entity;
                existingStore.StoreName = store.StoreName;
                existingStore.Location = store.Location;
                existingStore.IsDelete = store.IsDelete;
                _context.Update(existingStore);
                _context.SaveChanges();
            }
            catch (System.Exception ex)
            {
                throw new Exception("Update fail: " + ex.Message);
            }
        }


    }
}