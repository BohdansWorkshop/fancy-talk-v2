export class MessageModel {
    author: string;
    text: string;
    sentByMyself: boolean;
    date: string;

    constructor(author: string, text: string, sentByMyself = false, date: Date = new Date(Date.now())) {
        this.author = author;
        this.text = text;
        this.sentByMyself = sentByMyself;
        this.date = `${date.getHours()} : ${date.getMinutes()}`;
    }
}