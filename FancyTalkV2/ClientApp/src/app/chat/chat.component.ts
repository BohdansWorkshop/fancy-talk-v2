import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageModel } from '../models/messageModel';
import { UserModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { FancyTalkService } from '../services/fancy-talk.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    groupList = ['Lobby', 'Custom', 'VIP'];
    currentUser: UserModel;
    currentGroup: string;
    messages: MessageModel[] = [];
    text = "";

    constructor(private fancyTalkService: FancyTalkService, private authService: AuthService, private router: Router) { }

    async ngOnInit() {
        if (!localStorage.getItem("nickname")) {
            this.router.navigate(['/']);
        }
        await this.fancyTalkService.connectToHub();
        this.subscribeToMessageReceived();
        this.subscribeToGroupAdvertisements();
        this.currentUser = new UserModel(localStorage.getItem("nickname"));
        if (!this.currentGroup) {
            this.currentGroup = this.groupList[0];
            await this.fancyTalkService.joinGroup(this.currentGroup, this.currentUser.nickname);
        }
    }

    sendMessage() {
        this.fancyTalkService.sendMessageToHub(this.currentGroup, new MessageModel(this.currentUser.nickname, this.text));
        this.text = "";
    }

    onChatGroupSelected(groupName: string) {
        if (this.currentGroup === groupName)
            return;

        this.fancyTalkService.leaveGroup(this.currentGroup, this.currentUser.nickname);
        this.fancyTalkService.joinGroup(groupName, this.currentUser.nickname);
        this.currentGroup = groupName;
        this.messages = [];
    }

    onLeaveChat() {
        this.fancyTalkService.leaveGroup(this.currentGroup, this.currentUser.nickname);
        this.authService.signOut();
        localStorage.removeItem('nickname');
        this.router.navigate(['/']);
    }

    private subscribeToMessageReceived() {
        this.fancyTalkService.messageReceived.subscribe((msg: MessageModel) => {
            msg.sentByMyself = (msg.author === this.currentUser.nickname);
            this.messages.push(msg);
        });
    }

    private subscribeToGroupAdvertisements() {
        this.fancyTalkService.groupAdvertisement.subscribe((msg: string) => {
            this.messages.push(new MessageModel("System", `General: ${msg}`));
        })
    }
}