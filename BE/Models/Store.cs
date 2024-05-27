using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Swp391.Models;

public partial class Store
{
    public int StoreId { get; set; }

    public string StoreName { get; set; } 

    public string? Location { get; set; }

    public int? IsDelete { get; set; }
      
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    [JsonIgnore]
    public virtual ICollection<Table> Tables { get; set; } = new List<Table>();
    [JsonIgnore]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
