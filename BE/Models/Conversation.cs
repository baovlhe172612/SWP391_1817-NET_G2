using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Conversation
{
    public int ConversationId { get; set; }

    public int UserChatFirstId { get; set; }

    public int UserSecondId { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual UserChat? UserChatFirst { get; set; }

    public virtual UserChat? UserSecond { get; set; }
}
