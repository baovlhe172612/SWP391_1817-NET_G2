using System;
using System.Collections.Generic;

namespace Swp391.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public int CategoryId { get; set; }

    public DateTime? ModifileDate { get; set; }

    public DateTime? CreateDate { get; set; }

    public string? Img { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();
}
