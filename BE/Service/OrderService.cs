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
    }
}
