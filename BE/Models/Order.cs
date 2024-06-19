using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public DateTime? Date { get; set; }

    public int Status { get; set; }

    public int TableId { get; set; }

    public int StoreId { get; set; }

    public int? PaymentId { get; set; }

    public string? Note { get; set; }

    public double Total { get; set; }

    [JsonIgnore]
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    [JsonIgnore]
    public virtual Payment? Payment { get; set; }
    [JsonIgnore]
    public virtual Store Store { get; set; } = null!;
    [JsonIgnore]
    public virtual Table Table { get; set; } = null!;
}
