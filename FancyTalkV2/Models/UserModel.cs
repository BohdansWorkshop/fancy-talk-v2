using System.Collections.Generic;

namespace FancyTalkV2.Models
{
    public class UserModel
    {
        public string Name { get; set; }
        public List<MessageModel> Messages { get; set; } = new List<MessageModel>();
    }
}
