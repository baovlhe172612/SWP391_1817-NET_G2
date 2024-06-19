using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Dtos
{
    public class MessageDtos
    {
        public int MessId { get; set; }

        public int CoverId { get; set; }

        public int SensiderId { get; set; }

        public string ContentChat { get; set; }

        public DateTime TimeStamp { get; set; }

        public int Role {get; set; }

        public string UserName { get; set; }
    }
}