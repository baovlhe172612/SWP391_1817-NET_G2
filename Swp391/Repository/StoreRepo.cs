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
        public void createStore(Store store)
        {
            SwpfinalContext _context = new SwpfinalContext();
            _context.Stores.Add(store);
        }
    }
}