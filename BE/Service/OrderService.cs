using BE.Dtos;
using BE.Models;
using BE.Repository;

namespace BE.Service
{
    public class OrderService
    {
        private readonly OrderRepo _repo = new OrderRepo();

        public List<Order> getListOrderService()
        {
            return _repo.getAllOrder();
        }
        public List<OrderDtos> getListOrderServiceHaveTableNameById(int id)
        {
            return _repo.getAllOrderHaveTableNameById(id);
        }

        public List<Order> getListOrderServiceByStoreId(int id)
        {
            return _repo.getAllOrderByStoreId(id);
        }

        public void addOrderService(Order order)
        {
            _repo.addOrder(order);
        }

        public void updateOrderService(Order order)
        {
            _repo.updateOreder(order);
        }

        public List<DailyRevenueDtos> GetDailyRevenueServiceByDay()
        {
            return _repo.GetDailyRevenue();
        }

        public List<MonthlyRevenueDtos> GetDailyRevenueServiceByMonth()
        {
            return _repo.GetMonthlyRevenue();
        }



        public List<DailyRevenueDtos> GetDailyRevenueByStoreId(int storeId)
        {
            var revenueList = _repo.GetDailyRevenue()
                                    .Where(dr => dr.StoreID == storeId)
                                    .OrderBy(dr => dr.Date)
                                    .ThenBy(dr => dr.StoreID)
                                    .ToList();

            return revenueList;
        }

        public List<MonthlyRevenueDtos> GetMonthlyRevenueByStoreId(int storeId)
        {
            var revenueList = _repo.GetMonthlyRevenue()
                                    .Where(dr => dr.StoreID == storeId)
                                    .OrderBy(dr => dr.YearMonth)
                                    .ThenBy(dr => dr.StoreID)
                                    .ToList();

            return revenueList;
        }

        public void UpdateOrderStatusService(int orderId, int newStatus)
        {
            _repo.UpdateOrderStatus(orderId, newStatus);
        }


    }
}
