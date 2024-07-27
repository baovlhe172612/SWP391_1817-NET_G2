using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class Post
{
    public int PostId { get; set; }

    public string Title { get; set; } = null!;

    public string? Contents { get; set; }

    public string? Img { get; set; }

    public int IsPublished { get; set; }

    public string? Author { get; set; }

    public int? Status { get; set; }

    public string Tags { get; set; } = null!;

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiDate { get; set; }

    public int? StoreId { get; set; }
    [JsonIgnore]
    public virtual Store? Store { get; set; }
}
