using FancyTalkV2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FancyTalkV2.Controllers
{
    [Authorize]
    public class FancyTalkHub : Hub
    {
        public string GetClientId()
        {
            return Context.ConnectionId;
        }

        public async Task SendMessage(string groupName, MessageModel msg)
        {
            await Clients.Group(groupName).SendAsync("messageReceived", msg);
        }

        public async Task JoinGroup(string groupName, string nickname)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("groupAdvertisement", $"{nickname} has joined {groupName}");
        }

        public async Task LeaveGroup(string groupName, string nickname)
        {
            await Groups.RemoveFromGroupAsync(this.Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("groupAdvertisement", $"{nickname} has left {groupName}");
        }
    }
}
