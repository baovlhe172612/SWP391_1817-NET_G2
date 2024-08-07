﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class OrderDetail
{
    public int OrderDetailId { get; set; }

    public int ProductSizeId { get; set; }

    public int? Quantity { get; set; }

    public double Price { get; set; }

    public int? Status { get; set; }

    public int OrderId { get; set; }

    public virtual Order Order { get; set; } = null!;

    [JsonIgnore]
    public virtual ProductSize ProductSize { get; set; } = null!;
}

public class OrderDetaildtosTime
{
    public int OrderDetailId { get; set; }

    public int ProductSizeId { get; set; }

    public int? Quantity { get; set; }

    public double Price { get; set; }

    public int? Status { get; set; }

    public int OrderId { get; set; }
    
    public DateTime date { get; set; }

    public virtual Order Order { get; set; } = null!;

    [JsonIgnore]
    public virtual ProductSize ProductSize { get; set; } = null!;
}
