using BE.Models;
using Swp391.Controllers;
using Swp391.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

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



        public List<OrderDetail> listOrderDetailByStatus()
        {
            return _context.OrderDetails.Where(od => od.Status == -1 || od.Status == 0).ToList();
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

        public List<OrderDetailDto> GetOrderDetailSummaryByStoreId()
        {
            try
            {
                var summary = (from od in _context.OrderDetails
                               join pz in _context.ProductSizes on od.ProductSizeId equals pz.ProductSizeId
                               join p in _context.Products on pz.ProductId equals p.ProductId
                               join o in _context.Orders on od.OrderId equals o.OrderId
                               join s in _context.Stores on o.StoreId equals s.StoreId
                               group new { od, pz, p, s } by new
                               {
                                   od.ProductSizeId,
                                   pz.ProductId,
                                   p.ProductName,
                                   s.StoreId,
                                   s.StoreName
                               } into g
                               orderby g.Sum(x => x.od.Quantity) descending
                               select new OrderDetailDto
                               {
                                   Product_SizeID = g.Key.ProductSizeId,
                                   ProductID = g.Key.ProductId,
                                   ProductName = g.Key.ProductName,
                                   StoreID = g.Key.StoreId,
                                   StoreName = g.Key.StoreName,
                                   TotalQuantity = g.Sum(x => x.od.Quantity ?? 0)  // Calculate total quantity here
                               }).Take(25).ToList();

                return summary;
            }
            catch (Exception ex)
            {
                // Log exception if needed
                throw new Exception("An error occurred while fetching order detail summary", ex);
            }
        }

        public List<OrderDetailDto> GetOrderDetailSummary()
        {
            try
            {
                var summary = (from od in _context.OrderDetails
                               join pz in _context.ProductSizes on od.ProductSizeId equals pz.ProductSizeId
                               join p in _context.Products on pz.ProductId equals p.ProductId
                               join o in _context.Orders on od.OrderId equals o.OrderId
                               join s in _context.Stores on o.StoreId equals s.StoreId
                               join size in _context.Sizes on pz.SizeId equals size.SizeId
                             
                               group new { od, pz, p, s, size } by new
                               {
                                   od.ProductSizeId,
                                   pz.ProductId,
                                   p.ProductName,
                                   size.SizeName,
                                   s.StoreName
                               } into g
                               orderby g.Sum(x => x.od.Quantity) descending
                               select new OrderDetailDto
                               {
                                   Product_SizeID = g.Key.ProductSizeId,
                                   ProductID = g.Key.ProductId,
                                   ProductName = g.Key.ProductName + " size " + g.Key.SizeName,  // Combine ProductName and SizeName
                                   StoreName = g.Key.StoreName,
                                   TotalQuantity = g.Sum(x => x.od.Quantity ?? 0)  // Calculate total quantity here
                               }).ToList();

                return summary;
            }
            catch (Exception ex)
            {
                // Log exception if needed
                throw new Exception("An error occurred while fetching order detail summary", ex);
            }
        }


        public List<OrderDetailDto> GetOrderDetailSummaryByStoreId(int storeId)
        {
            try
            {
                var summary = (from od in _context.OrderDetails
                               join pz in _context.ProductSizes on od.ProductSizeId equals pz.ProductSizeId
                               join p in _context.Products on pz.ProductId equals p.ProductId
                               join o in _context.Orders on od.OrderId equals o.OrderId
                               join s in _context.Stores on o.StoreId equals s.StoreId
                               join size in _context.Sizes on pz.SizeId equals size.SizeId
                               where s.StoreId == storeId
                               group new { od, pz, p, s, size } by new
                               {
                                   od.ProductSizeId,
                                   pz.ProductId,
                                   p.ProductName,
                                   size.SizeName,
                                   s.StoreName
                               } into g
                               orderby g.Sum(x => x.od.Quantity) descending
                               select new OrderDetailDto
                               {
                                   Product_SizeID = g.Key.ProductSizeId,
                                   ProductID = g.Key.ProductId,
                                   ProductName = g.Key.ProductName + " size " + g.Key.SizeName,  // Combine ProductName and SizeName
                                   StoreName = g.Key.StoreName,
                                   TotalQuantity = g.Sum(x => x.od.Quantity ?? 0)  // Calculate total quantity here
                               }).Take(7).ToList();

                return summary;
            }
            catch (Exception ex)
            {
                // Log exception if needed
                throw new Exception("An error occurred while fetching order detail summary", ex);
            }
        }




        // get orderdetail by status

        public List<OrderDetailDto> getOrderDetailByStatus(int storeId)
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
                                        where (od.Status == 0 || od.Status == -1) && o.StoreId == storeId
                                        select new OrderDetailDto
                                        {
                                            OrderID = o.OrderId,
                                            OrderDetailID = od.OrderDetailId,
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
                                            Status=od.Status,
                                            ProductName = p.ProductName,
                                            Date = o.Date
                                        }).ToList();

                if (listOrderDetails == null || listOrderDetails.Count == 0)
                {
                    // Log thông báo nếu không có chi tiết đơn hàng nào
                    // Log.Information("No order details found for the given storeId: {storeId}", storeId);
                    return new List<OrderDetailDto>();
                }

                return listOrderDetails;
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết để dễ dàng kiểm tra
                // Log.Error(ex, "An error occurred while fetching order details for storeId: {storeId}", storeId);
                throw new Exception("An error occurred while fetching order details", ex);
            }
        }
        public void UpdateStatus(List<OrderDeltailDtos_UpdateStatus> orderDetails)
        {
            if (orderDetails == null || orderDetails.Count == 0)
            {
                throw new ArgumentException("Order details list cannot be null or empty.");
            }

            foreach (var orderDetail in orderDetails)
            {
                var existingOrderDetail = _context.OrderDetails.FirstOrDefault(od => od.OrderDetailId == orderDetail.OrderDetailID);
                if (existingOrderDetail != null)
                {
                    existingOrderDetail.Status = orderDetail.Status;
                    _context.OrderDetails.Update(existingOrderDetail);
                }
                else
                {
                    throw new Exception($"Order detail with ID {orderDetail.OrderDetailID} not found.");
                }
            }

            _context.SaveChanges();
        }


    }

    
}
