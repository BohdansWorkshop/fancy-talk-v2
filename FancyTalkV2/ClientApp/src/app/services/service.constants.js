"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceConstants = void 0;
var ServiceConstants = /** @class */ (function () {
    function ServiceConstants() {
    }
    ServiceConstants.FancyTalkHubRoute = "https://localhost:44318/fancyTalk";
    ServiceConstants.AuthRoute = "auth/signin";
    ServiceConstants.SignoutRoute = "auth/signout";
    ServiceConstants.HubSendMessageAction = "SendMessage";
    ServiceConstants.HubJoinGroupAction = "JoinGroup";
    ServiceConstants.HubLeaveGroupAction = "LeaveGroup";
    ServiceConstants.HubGroupAdvertisementEvent = "groupAdvertisement";
    ServiceConstants.HubMessageReceivedEvent = "messageReceived";
    return ServiceConstants;
}());
exports.ServiceConstants = ServiceConstants;
//# sourceMappingURL=service.constants.js.map