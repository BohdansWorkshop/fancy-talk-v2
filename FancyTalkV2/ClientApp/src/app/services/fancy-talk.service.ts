import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { MessageModel } from '../models/messageModel';
import { ServiceConstants } from './service.constants';

@Injectable({
    providedIn: 'root'
})
export class FancyTalkService {
    messages: string[];
    messageReceived = new EventEmitter<MessageModel>();
    groupAdvertisement = new EventEmitter<string>();
    private hubConnection: HubConnection;

    constructor(private httpClient: HttpClient) { }

    async sendMessageToHub(groupName: string, message: MessageModel) {
        return this.hubConnection.invoke(ServiceConstants.HubSendMessageAction, groupName, message)
            .then((data: any) => { return data; })
            .catch((err) => console.log('error while sending a message to hub: ' + err));
    }

    async joinGroup(groupName: string, nickname: string) {
        return this.hubConnection.invoke(ServiceConstants.HubJoinGroupAction, groupName, nickname)
            .catch((err) => console.log(`error while joining group ${groupName}: ${err}`));
    }

    async leaveGroup(groupName: string, nickname: string) {
        return this.hubConnection.invoke(ServiceConstants.HubLeaveGroupAction, groupName, nickname)
            .catch((err) => console.log(`error while leaving group ${groupName}: ${err}`));
    }

    async connectToHub() {
        this.setupHubConnection();
        this.addMessageListeners();

        await this.hubConnection
            .start()
            .then(() => console.log('connection started'))
            .catch(err => {
                console.log('Error while establishing connection, retrying...', err);
                setTimeout(function () { this.connectToHub }, 1000);
            });
    }

    private setupHubConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(ServiceConstants.FancyTalkHubRoute)
            .configureLogging(LogLevel.Trace)
            .build();
    }

    private addMessageListeners() {
        this.hubConnection.on(ServiceConstants.HubMessageReceivedEvent, (msg: MessageModel) => {
            this.messageReceived.emit(msg);
        });

        this.hubConnection.on(ServiceConstants.HubGroupAdvertisementEvent, (msg: string) => {
            this.groupAdvertisement.emit(msg);
        });
    }
}
