using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class UserChat
{
    public int UserId { get; set; }

    public int Role { get; set; }

    public string UserName { get; set; } = null!;

    public virtual ICollection<Conversation> ConversationUserChatFirsts { get; set; } = new List<Conversation>();

    public virtual ICollection<Conversation> ConversationUserSeconds { get; set; } = new List<Conversation>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
