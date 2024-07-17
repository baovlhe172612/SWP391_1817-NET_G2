using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class Message
{
    public int MessId { get; set; }

    public int CoverId { get; set; }

    public int SensiderId { get; set; }

    public string ContentChat { get; set; }

    public DateTime TimeStamp { get; set; }
    [JsonIgnore]
    public virtual Conversation? Cover { get; set; }
    [JsonIgnore]
    public virtual UserChat? Sensider { get; set; }
}
