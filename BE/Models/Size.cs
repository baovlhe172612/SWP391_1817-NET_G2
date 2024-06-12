﻿using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Size
{
    public int SizeId { get; set; }

    public string SizeName { get; set; } = null!;

    public double? Price { get; set; }

    public int? IsDelete { get; set; }

    public int? Status { get; set; }

    public DateOnly? DateCreated { get; set; }

    public DateOnly? DateDeleted { get; set; }

    public virtual ICollection<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();
}
