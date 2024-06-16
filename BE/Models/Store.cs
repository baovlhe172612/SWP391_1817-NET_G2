using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Store
{
    public int StoreId { get; set; }

    public string StoreName { get; set; } = null!;

    public string? Location { get; set; }

    public int? IsDelete { get; set; }

    public int? Status { get; set; }

    public DateOnly? DateCreated { get; set; }

    public DateOnly? DateDeleted { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
  [JsonIgnore]
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual ICollection<MessengerBox> MessengerBoxes { get; set; } = new List<MessengerBox>();
  [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
  [JsonIgnore]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
  [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<Table> Tables { get; set; } = new List<Table>();
}
