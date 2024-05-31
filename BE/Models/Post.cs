using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Post
{
    public int PostId { get; set; }

    public string Title { get; set; } = null!;

    public string? Contents { get; set; }

    public string? Img { get; set; }

    public int IsPublished { get; set; }

    public int IsNewFeed { get; set; }

    public string? Author { get; set; }

    public string Tags { get; set; } = null!;

    public int IsDelete { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiDate { get; set; }
}
