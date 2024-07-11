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

        public List<OrderDetailDto> GetOrderDetailSummary()
        {
            try
            {
                return _repo.GetOrderDetailSummary();
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
                return _repo.GetOrderDetailSummaryByStoreId(storeId);
            }
            catch (Exception ex)
            {
                // Log exception if needed
                throw new Exception("An error occurred while fetching order detail summary", ex);
            }
        }

        public List<OrderDetailDto> getOrderDetailByStatus(int storeId)
        {
            return _repo.getOrderDetailByStatus(storeId);
        }

        public void updateStatus(List<OrderDeltailDtos_UpdateStatus> orderDetails)
        {
            _repo.UpdateStatus(orderDetails);
        }
    }
}
