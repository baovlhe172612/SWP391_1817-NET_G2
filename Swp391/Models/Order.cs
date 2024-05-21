using System;
using System.Collections.Generic;

namespace Swp391.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public DateTime? Date { get; set; }

    public int Status { get; set; }

    public int TableId { get; set; }

    public int StoreId { get; set; }

    public double Total { get; set; }

    public virtual OrderDetail? OrderDetail { get; set; }

    public virtual Store Store { get; set; } = null!;

    public virtual Table Table { get; set; } = null!;
}
