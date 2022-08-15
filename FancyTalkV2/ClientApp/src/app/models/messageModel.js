"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
var MessageModel = /** @class */ (function () {
    function MessageModel(author, text, sentByMyself, date) {
        if (sentByMyself === void 0) { sentByMyself = false; }
        if (date === void 0) { date = new Date(Date.now()); }
        this.author = author;
        this.text = text;
        this.sentByMyself = sentByMyself;
        this.date = "".concat(date.getHours(), " : ").concat(date.getMinutes());
    }
    return MessageModel;
}());
exports.MessageModel = MessageModel;
//# sourceMappingURL=messageModel.js.map