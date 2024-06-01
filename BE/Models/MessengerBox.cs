using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class MessengerBox
{
    public int MessengerBoxId { get; set; }

    public string? MessengerDescription { get; set; }

    public string? Author { get; set; }

    public DateTime? CreateDate { get; set; }

    public int? IsDelete { get; set; }
}
