using System;
using System.Collections.Generic;

namespace Swp391.Models;

public partial class Table
{
    public int TableId { get; set; }

    public string TableName { get; set; } = null!;

    public int Status { get; set; }

    public int StoreId { get; set; }

    public string? IsDelete { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Store Store { get; set; } = null!;
}
