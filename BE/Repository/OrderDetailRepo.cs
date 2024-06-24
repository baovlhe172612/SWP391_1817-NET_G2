using BE.Models;
using Swp391.Dtos;

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
        public List<OrderDetailDto> getOrderDetailByOrderId(int storeId, int orderId)
        {
            try
            {
                var listOrderDetails = (from o in _context.Orders
                                        join st in _context.Stores on o.StoreId equals st.StoreId
                                        join t in _context.Tables on o.TableId equals t.TableId
                                        join od in _context.OrderDetails on o.OrderId equals od.OrderId
                                        join pz in _context.ProductSizes on od.ProductSizeId equals pz.ProductSizeId
                                        join s in _context.Sizes on pz.SizeId equals s.SizeId
                                        join p in _context.Products on pz.ProductId equals p.ProductId

                                        where o.OrderId == orderId && o.StoreId == storeId
                                        select new OrderDetailDto
                                        {
                                            OrderID = o.OrderId,
                                            StoreID = o.StoreId,
                                            StoreName = st.StoreName,
                                            TableID = o.TableId,
                                            TableName = t.TableName,
                                            Price = od.Price,
                                            Product_SizeID = od.ProductSizeId,
                                            Quantity = (int)od.Quantity,
                                            SizeID = s.SizeId,
                                            SizeName = s.SizeName,
                                            Img = p.Img,
                                            ProductName = p.ProductName
                                        }).ToList();

                if (listOrderDetails == null || listOrderDetails.Count == 0)
                {
                    return new List<OrderDetailDto>();
                }

                return listOrderDetails;
            }
            catch (Exception ex)
            {
                // Log exception if needed, for example:
                // Log.Error(ex, "An error occurred while fetching orders");
                throw new Exception("An error occurred while fetching order details", ex);
            }
        }

    }
}
