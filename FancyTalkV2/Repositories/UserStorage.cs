using FancyTalkV2.Models;
using System.Collections.Generic;
using System.Linq;

namespace FancyTalkV2.Repositories
{
    public class UserStorage : IUserStorage
    {
        private List<UserModel> _clients { get; set; } = new List<UserModel>();

        public void AddUser(UserModel client)
        {
            _clients.Add(client);
        }

        public bool UserWithNameExists(string name)
        {
            return _clients.Any(x => x.Name == name);
        }
    }
}
