using System;
using System.Collections.Generic;

namespace Swp391.Models;

public partial class MessengerBox
{
    public int MessengerBoxId { get; set; }

    public string? MessengerDescription { get; set; }

    public string? Author { get; set; }

    public DateTime? CreateDate { get; set; }
}
