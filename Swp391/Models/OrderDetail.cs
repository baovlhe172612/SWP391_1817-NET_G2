using System;
using System.Collections.Generic;

namespace Swp391.Models;

public partial class OrderDetail
{
    public int OrderId { get; set; }

    public int ProductSizeId { get; set; }

    public int? Quantity { get; set; }

    public double Price { get; set; }

    public string? Note { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ProductSize ProductSize { get; set; } = null!;
}
