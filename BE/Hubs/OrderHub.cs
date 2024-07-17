using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using BE.Models;
using BE.Service;
using BE.Dtos;

public class OrderHub : Hub
{
   

    private readonly ILogger<OrderHub> _logger;

    public OrderHub(ILogger<OrderHub> logger)
    {
        _logger = logger;
    }
    public async Task SendOrderNotification(string tableId, List<CartItem> cart)
    {
        try
        {
            await Clients.All.SendAsync("ReceiveOrderNotification", tableId, cart);
            
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error in SendOrderNotification: {ex.Message}");
            throw; // Throw exception to handle it on the client side
        }
    }
    // Hàm gửi thông báo đơn hàng đến một nhóm cụ thể dựa trên tableId
    public async Task SendOrderNotificationToGroup(string tableId, string productsizeId, string status, string date)
    {
        try
        {
            // Gửi tin nhắn đến một nhóm cụ thể dựa trên tableId
            await Clients.Group(tableId).SendAsync("ReceiveOrderNotification", tableId, productsizeId, status, date);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error in SendOrderNotificationToGroup: {ex.Message}");
            throw; // Throw exception to handle it on the client side
        }
    }
    public async Task SendSTT(String tableId,List<numericalOrder> listSTT)
    {
        try
        {          
            await Clients.Group(tableId).SendAsync("ReceiveOrderSTT", listSTT);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error in SendOrderSTToGroup: {ex.Message}");
            throw; // Throw exception to handle it on the client side
        }
    }

    // Phương thức để tham gia nhóm dựa trên tableId
    public async Task JoinTableGroup(string tableId)
    {
        try
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, tableId);
            _logger.LogInformation($"Connection {Context.ConnectionId} joined group {tableId}");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error in JoinTableGroup: {ex.Message}");
            throw; // Throw exception to handle it on the client side
        }
    }
}


   



