using BE.Models;
using BE.Repository;
using Microsoft.EntityFrameworkCore;
using Swp391.Dtos;

namespace BE.Service
{
    public class OrderDetailService
    {
        private readonly OrderDetailRepo _repo = new OrderDetailRepo();
        public List<OrderDetail> listOrderDetailService()
        {
            return _repo.listOrderDetail() ;
        }
        /// <summary>
        /// add OrderDetail
        /// </summary>

        /// <returns>add OrderDetail</returns>

        public void addOrderDetailService(OrderDetail orderDetail)
        {
            _repo.addOrderDetail(orderDetail);
        }
        public List<OrderDetailDto> listOrderDetailByOrderIdService(int storeID, int orderId)
        {
            return _repo.getOrderDetailByOrderId(storeID, orderId);
        }
    }
}
