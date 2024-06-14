﻿using BE.Dtos;
using BE.Models;
using BE.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _service = new OrderService();
        private readonly OrderDetailService _detailService = new OrderDetailService();

        [HttpPost("AddOrderDetail")]
        public IActionResult Order( List<CartItemDtos> cartItems)
        {
            if(cartItems == null || cartItems.Count == 0)
            {
                return BadRequest("No data");
            }

            //lấy ra orderList 
            DateTime currentTime = DateTime.Now;

            Order order = new Order {  Status = 0, StoreId=1, TableId=1,Date= currentTime };

            //tạo order mới
            _service.addOrderService(order);

            Order orderJustAdd = _service.getListOrderService()[_service.getListOrderService().Count - 1];

            long sumTotalPrice = 0;

            //add orderDetail
            foreach (var item in cartItems)
            {
                OrderDetail orderDetail = new OrderDetail
                { OrderId = orderJustAdd.OrderId, ProductSizeId = item.ProductSizeID, Quantity = item.quantity, Price = item.price };
                _detailService.addOrderDetailService(orderDetail);
                sumTotalPrice += item.price;
            }

            orderJustAdd.Total= sumTotalPrice;

            _service.updateOrderService(orderJustAdd);

            return Ok(cartItems);
        }
    
        // GET ALL ORDERS
        [HttpGet("v1/orders")]
        public IActionResult ListOrder() {
            var listOrder = _service.getListOrderService();

            if(listOrder != null) {
                return Ok(listOrder);
            }
            return BadRequest();
        }
    }
}
