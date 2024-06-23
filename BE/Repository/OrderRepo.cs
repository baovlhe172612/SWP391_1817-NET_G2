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

        public List<Order> getAllOrderByStoreId(int id)
        {
            try
            {
                var listOrder = context.Orders
                                .Where(o => o.StoreId == id)
                                .OrderByDescending(o => o.Date)
                                .ToList();

                // Kiểm tra nếu danh sách rỗng
                if (listOrder == null || listOrder.Count == 0)
                {
                    return new List<Order>();
                }

                return listOrder;
            }
            catch (Exception ex)
            {
                // Log exception if needed, for example:
                // Log.Error(ex, "An error occurred while fetching orders");
                throw new Exception("An error occurred while fetching orders", ex);

                return new List<Order>();
            }
        }

    }
}
