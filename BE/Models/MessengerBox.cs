using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class MessengerBox
{
    public int MessengerBoxId { get; set; }

    public string? MessengerDescription { get; set; }

    public string? Author { get; set; }

    public DateTime? CreateDate { get; set; }

    public int? IsDelete { get; set; }

    public int? StoreId { get; set; }

    public DateOnly? DateDeleted { get; set; }
    [JsonIgnore]
    public virtual Store? Store { get; set; }
}
