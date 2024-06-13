using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Message
{
    public int MessId { get; set; }

    public int CoverId { get; set; }

    public int SensiderId { get; set; }

    public string ContentChat { get; set; } = null!;

    public byte[] TimeStamp { get; set; } = null!;

    public virtual Conversation? Conversation { get; set; }

    public virtual UserChat Sensider { get; set; } = null!;
}
