using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class Payment
{
    public int PayId { get; set; }

    public string Payment1 { get; set; } = null!;

    public string PaymentDesciption { get; set; } = null!;

    public int IsDelete { get; set; }
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
