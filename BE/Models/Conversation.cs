using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BE.Models;

public partial class Conversation
{
    public int ConversationId { get; set; }

    public int UserChatFirstId { get; set; } // USER

    public int? UserSecondId { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual UserChat? UserChatFirst { get; set; }
    [JsonIgnore]
    public virtual UserChat? UserSecond { get; set; }
}
