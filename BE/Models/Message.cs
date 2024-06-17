using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Message
{
    public int MessId { get; set; }

    public int? CoverId { get; set; }

    public int? SensiderId { get; set; }

    public string? ContentChat { get; set; }

    public byte[]? TimeStamp { get; set; }

    public virtual Conversation? Cover { get; set; }

    public virtual UserChat? Sensider { get; set; }
}
