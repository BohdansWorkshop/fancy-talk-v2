using FancyTalkV2.Models;
using System.Collections.Generic;

namespace FancyTalkV2.Repositories
{
    public interface IUserStorage
    {
        void AddUser(UserModel user);

        bool UserWithNameExists(string name);
    }
}