using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Conversation
{
    public int ConversationId { get; set; }

    public int? UserChatFirstId { get; set; }

    public int? UserSecondId { get; set; }

    public virtual Message ConversationNavigation { get; set; } = null!;

    public virtual UserChat? UserChatFirst { get; set; }

    public virtual UserChat? UserSecond { get; set; }
}
