import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/app.gateway';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @Inject(AppGateway) private readonly appGateway: AppGateway
    ) { }

    async sendMessage(userId: string, chatId: string, text: string) {
        const newMessage = new this.messageModel({
            text: text,
            sender: userId,
            chat: chatId
        })

        await newMessage.save();

        this.appGateway.server.to(chatId).emit('message', newMessage);

        return newMessage;
    }
}
