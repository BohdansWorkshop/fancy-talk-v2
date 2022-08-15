export class ServiceConstants {
    static readonly FancyTalkHubRoute = "https://localhost:44318/fancyTalk";
    static readonly AuthRoute = "auth/signin";
    static readonly SignoutRoute = "auth/signout";
               
    static readonly HubSendMessageAction = "SendMessage";
    static readonly HubJoinGroupAction = "JoinGroup";
    static readonly HubLeaveGroupAction = "LeaveGroup";
               
    static readonly HubGroupAdvertisementEvent = "groupAdvertisement";
    static readonly HubMessageReceivedEvent = "messageReceived";
}