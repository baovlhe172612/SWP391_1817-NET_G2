﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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
    [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    [JsonIgnore]
    public virtual Store? Store { get; set; }
}
