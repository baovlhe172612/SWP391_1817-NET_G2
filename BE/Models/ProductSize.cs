using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;
public partial class ProductSize
{
    public int ProductSizeId { get; set; }

    public int ProductId { get; set; }

    public int SizeId { get; set; }

    public int? Quanity { get; set; }

    public double? Price { get; set; }

    public int? IsDelete { get; set; }

    public int? Status { get; set; }
    [JsonIgnore]
    public DateOnly? DateCreated { get; set; }
    [JsonIgnore]
    public DateOnly? DateDeleted { get; set; }
    [JsonIgnore]
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    [JsonIgnore]
    public virtual Product Product { get; set; } = null!;
    [JsonIgnore]
    public virtual Size Size { get; set; } = null!;
}
