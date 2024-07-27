using BE.Dtos;
using BE.Models;
using BE.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Controllers;
using Swp391.Dtos;
using System;

namespace BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _service = new OrderService();
        private readonly OrderDetailService _detailService = new OrderDetailService();

        [HttpPost("AddOrderDetail")]
        public IActionResult Order(List<CartItemDtos> cartItems, int payMentID, String note, int storeId, int tableId)
        {
            if (cartItems == null || cartItems.Count == 0)
            {
                return BadRequest("No data");
            }

            if (storeId == -1 || tableId == -1)
            {
                //lấy ra orderList 
                DateTime currentTime = DateTime.Now.AddHours(-7);

                Order order = new Order { Status = 0, StoreId = 1, TableId = 1, PaymentId = payMentID, Note = note, Date = currentTime };

                //tạo order mới
                _service.addOrderService(order);

                Order orderJustAdd = _service.getListOrderService()[_service.getListOrderService().Count - 1];

                long sumTotalPrice = 0;

                //add orderDetail
                foreach (var item in cartItems)
                {
                    OrderDetail orderDetail = new OrderDetail
                    { Status = -1, OrderId = orderJustAdd.OrderId, ProductSizeId = item.ProductSizeID, Quantity = item.quantity, Price = item.price };
                    _detailService.addOrderDetailService(orderDetail);
                    sumTotalPrice += item.price;
                }

                orderJustAdd.Total = sumTotalPrice;

                _service.updateOrderService(orderJustAdd);

                return Ok(cartItems);
            }

            else
            {
                //lấy ra orderList 
                DateTime currentTime = DateTime.Now.AddHours(-7);

                Order order = new Order { Status = 0, StoreId = storeId, TableId = tableId, PaymentId = payMentID, Note = note, Date = currentTime };

                //tạo order mới
                _service.addOrderService(order);

                Order orderJustAdd = _service.getListOrderService()[_service.getListOrderService().Count - 1];

                long sumTotalPrice = 0;

                //add orderDetail
                foreach (var item in cartItems)
                {
                    OrderDetail orderDetail = new OrderDetail
                    { Status = -1, OrderId = orderJustAdd.OrderId, ProductSizeId = item.ProductSizeID, Quantity = item.quantity, Price = item.price };
                    _detailService.addOrderDetailService(orderDetail);
                    sumTotalPrice += item.price;
                }

                orderJustAdd.Total = sumTotalPrice;

                _service.updateOrderService(orderJustAdd);

                return Ok(cartItems);
            }

        }

        // GET ALL ORDERS
        [HttpGet("v1/orders/store/{id}")]
        public IActionResult ListOrder(int id) {
            var listOrder = _service.getListOrderServiceByStoreId(id);

            return Ok(listOrder);
        }
        [HttpGet("/listHaveNameByStoreId/{id}")]
        public IActionResult ListOrdeHaveNameById(int id)
        {
            var listOrder = _service.getListOrderServiceHaveTableNameById(id);

            return Ok(listOrder);
        }

        //Get all orderdetail theo nhiều yếu tố
        [HttpGet("OrderDetail/{storeId}/{orderId}")]
        public IActionResult ListOrderDeatailById(int storeId, int orderId)
        {
            try
            {
                // Gọi service để lấy danh sách chi tiết đơn hàng
                var listOrder = _detailService.listOrderDetailByOrderIdService(storeId, orderId);

                // Trả về kết quả với mã trạng thái 200 OK
                return Ok(listOrder);
            }
            catch (Exception ex)
            {
                // Ghi log nếu cần, ví dụ:
                // Log.Error(ex, "An error occurred while fetching order details");
                // Trả về lỗi với mã trạng thái 500
                return StatusCode(500, "An error occurred while fetching order details.");
            }
        }

        // GET DAILY REVENUE
        [HttpGet("daily-revenue")]
        public IActionResult GetDailyRevenue()
        {
            try
            {
                var dailyRevenue = _service.GetDailyRevenueServiceByDay();
                return Ok(dailyRevenue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching daily revenue: " + ex.Message);
            }
        }

        // GET Month REVENUE
        [HttpGet("month-revenue")]
        public IActionResult GetMonthRevenue()
        {
            try
            {
                var monthlyRevenue = _service.GetDailyRevenueServiceByMonth();

                // Transform the list to use YearMonthString instead of YearMonth
                var response = monthlyRevenue.Select(mr => new
                {
                    yearMonth = mr.YearMonthString,
                    storeID = mr.StoreID,
                    storeName = mr.StoreName,
                    totalRevenue = mr.TotalRevenue
                }).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching monthly revenue: " + ex.Message);
            }
        }




        // GET api/order/daily-revenue/{storeId}
        [HttpGet("daily-revenue/{storeId}")]
        public IActionResult GetDailyRevenueByStoreId(int storeId)
        {
            try
            {
                var dailyRevenue = _service.GetDailyRevenueByStoreId(storeId);
                return Ok(dailyRevenue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching daily revenue by store ID: " + ex.Message);
            }
        }

        [HttpGet("month-revenue/{storeId}")]
        public IActionResult GetMonthlyRevenueByStoreId(int storeId)
        {
            try
            {
                var dailyRevenue = _service.GetMonthlyRevenueByStoreId(storeId);
                return Ok(dailyRevenue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching daily revenue by store ID: " + ex.Message);
            }
        }

        
       

        // GET api/order/order-detail-summary/{storeId}
        [HttpGet("order-detail-summary")]
        public IActionResult GetOrderDetailSummary()
        {
            try
            {
                var summary = _detailService.GetOrderDetailSummary();
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching order detail summary: " + ex.Message);
            }
        }

           // GET api/order/order-detail-summary/{storeId}
        [HttpGet("order-detail-summary/{storeId}")]
        public IActionResult GetOrderDetailSummaryByStoreId(int storeId)
        {
            try
            {
                var summary = _detailService.GetOrderDetailSummaryByStoreId(storeId);
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching order detail summary: " + ex.Message);
            }
        }




        [HttpGet("orderdetailbystatus")]

        public IActionResult getOrderDetailByStatus(int storeId)
        {
            try
            {
                return Ok(_detailService.getOrderDetailByStatus(storeId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [HttpPut("update")]
        public IActionResult updateStatus(List<OrderDeltailDtos_UpdateStatus> orderDetails)
        {
            try
            {
                _detailService.updateStatus(orderDetails);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPut("update-status/{orderId}/{newStatus}")]
        public IActionResult UpdateOrderStatus(int orderId, int newStatus)
        {
            try
            {
                _service.UpdateOrderStatusService(orderId, newStatus);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating order {orderId} status: {ex.Message}");
            }
        }





    }
}
