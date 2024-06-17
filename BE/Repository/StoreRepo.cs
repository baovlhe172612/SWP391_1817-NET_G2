using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;

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
            return _context.Stores
                            .Where(store => store.IsDelete == 0)
                            .ToList();
        }

        public List<StoreDtos> getAllStoreByStatus(int status)
        {
            var storeDtosByStatus = (from s in _context.Stores
                                     join a in _context.Accounts on s.StoreId equals a.StoreId
                                     where s.Status == status && a.RoleId == 2
                                     select new StoreDtos
                                     {
                                         StoreId = s.StoreId,
                                         StoreName = s.StoreName,
                                         Location = s.Location,
                                         IsDelete = s.IsDelete,
                                         Status = s.Status,
                                         AccountName = a.UserName,
                                         RoleId = a.RoleId,
                                         AccountId = a.AccountId,
                                     }
                                    ).ToList(); // Sử dụng ToList() để lấy danh sách các kết quả

            return storeDtosByStatus;
        }

        public List<StoreDtos> StoreByNameRepo(string name)
        {
            var storeDtosByName = (from s in _context.Stores
                                   join a in _context.Accounts on s.StoreId equals a.StoreId
                                   where s.StoreName.Contains(name) && a.RoleId == 2
                                   select new StoreDtos
                                   {
                                       StoreId = s.StoreId,
                                       StoreName = s.StoreName,
                                       Location = s.Location,
                                       IsDelete = s.IsDelete,
                                       Status = s.Status,
                                       AccountName = a.UserName,
                                       RoleId = a.RoleId,
                                       AccountId = a.AccountId,
                                   }
                                    ).ToList(); // Sử dụng ToList() để lấy danh sách các kết quả

            return storeDtosByName;
        }

        public void createStore(Store store)
        {
            _context.Stores.Add(store);

            _context.SaveChanges();
        }

        /// <summary>
        /// Update IsDelete
        /// </summary>
        public Store UpdateStore(Store store)
        {
            try
            {   
                store.DateCreated = null;
                store.DateCreated = null;
                _context.Stores.Update(store);
            {
                var existingStore = _context.Stores.Local.FirstOrDefault(s => s.StoreId == store.StoreId)
                ?? _context.Stores.Attach(store).Entity;
                existingStore.StoreName = store.StoreName;
                existingStore.Location = store.Location;
                existingStore.Status = store.Status;
                existingStore.IsDelete = store.IsDelete;
                existingStore.DateCreated = null;
                existingStore.DateDeleted = null;
                _context.Update(existingStore);
                _context.SaveChanges();
                return store;
            }
            catch (Exception ex)
            {
                throw new Exception("Update failed: " + ex.Message);
            }
            // Bổ sung return mặc định (sẽ không bao giờ tới đây do catch block ném exception)
            return null;
        }

    }
}