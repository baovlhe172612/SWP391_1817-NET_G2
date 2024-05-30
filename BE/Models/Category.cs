using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Swp391.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public int IsDelete { get; set; }
    [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
