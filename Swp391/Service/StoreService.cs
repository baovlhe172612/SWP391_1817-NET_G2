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
        StoreRepo storeRepo = new StoreRepo();
        public Store createStoreService(Store store) {
            storeRepo.createStore(store);

            return store;
        }
    }
}