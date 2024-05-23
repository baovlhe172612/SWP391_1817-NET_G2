using System;
using System.Collections.Generic;

namespace Swp391.Models;

public partial class Payment
{
    public int PayId { get; set; }

    public string Payment1 { get; set; } = null!;

    public string PaymentDesciption { get; set; } = null!;

    public int IsDelete { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
