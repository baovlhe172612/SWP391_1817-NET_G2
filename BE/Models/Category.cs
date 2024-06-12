using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public int IsDelete { get; set; }

    public int? Status { get; set; }

    public DateOnly? DateDeleted { get; set; }

    public int? StoreId { get; set; }

    public DateOnly? DateCreated { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual Store? Store { get; set; }
}
