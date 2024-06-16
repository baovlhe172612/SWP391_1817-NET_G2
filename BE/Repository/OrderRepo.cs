using BE.Models;

namespace BE.Repository
{
    public class OrderRepo
    {
        SwpfinalContext context = new SwpfinalContext();

        /// <summary>
        /// hàm trả về toàn bộ hóa đơn
        /// </summary>

        /// <returns>toàn bộ hóa đơn</returns>
        public List<Order> getAllOrder()
        {
            return context.Orders.ToList();
        }
        /// <summary>
        /// add order
        /// </summary>
        /// <returns> add order</returns>
        public void addOrder(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }
        /// <summary>
        /// update order
        /// </summary>
        public void updateOreder(Order order)
        {
            context.Orders.Update(order);
            context.SaveChanges();
        }
    }
}
