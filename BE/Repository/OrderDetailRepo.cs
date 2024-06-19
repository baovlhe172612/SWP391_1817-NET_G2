using BE.Models;

namespace BE.Repository
{
    public class OrderDetailRepo
    {
        /// <summary>
        /// lấy toàn bộ chi tiet san pham
        /// </summary>
        /// <returns>lấy toàn bộ chi tiet san pham</returns>
        private readonly SwpfinalContext _context = new SwpfinalContext();
        public List<OrderDetail> listOrderDetail()
        {
            return _context.OrderDetails.ToList();
        }
        /// <summary>
        /// add OrderDetail
        /// </summary>

        /// <returns>add OrderDetail</returns>

        public void addOrderDetail(OrderDetail orderDetail)
        {
            _context.OrderDetails.Add(orderDetail);
            _context.SaveChanges();
        }
    }
}
