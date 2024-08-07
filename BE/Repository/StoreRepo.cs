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
                                     where s.IsDelete == 0 && a.RoleId==2
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

        public void createStore(Store store)
        {
            store.DateCreated = DateOnly.FromDateTime(DateTime.Now);
            store.DateDeleted = null;
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
                _context.Update(store);

                _context.SaveChanges();

                return store;
            }
            catch (System.Exception ex)
            {
                throw new Exception("Update fail: " + ex.Message);
            }

            return null;
        }


        public List<Store> getAllNewStore()
        {
            var newStore = (from s in _context.Stores
                            join a in _context.Accounts
                            on s.StoreId equals a.StoreId into sa
                            from suba in sa.DefaultIfEmpty()
                            where suba == null & s.IsDelete == 0
                            select s).ToList();

            return newStore;
        }
    }
}
