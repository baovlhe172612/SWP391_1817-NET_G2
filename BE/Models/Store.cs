using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

    [JsonIgnore]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
  [JsonIgnore]
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
    [JsonIgnore]
    public virtual ICollection<MessengerBox> MessengerBoxes { get; set; } = new List<MessengerBox>();
  [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
  [JsonIgnore]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
  [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    [JsonIgnore]
    public virtual ICollection<Table> Tables { get; set; } = new List<Table>();
}