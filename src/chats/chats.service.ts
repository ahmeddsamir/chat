import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class ChatsService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) { }

    async getOrCreateChat(_id: string, id: string) {
        const existingChat = await this.chatModel.findOne({
            participants: { $all: [_id, id] },
        })
        .populate({
            path: 'participants',
            select: '-password',
            match: { _id: { $ne: _id } },
        })
        .populate('messages')
        .exec();

        if (existingChat) {
            return existingChat;
        }

        const newChat = new this.chatModel({
            participants: [_id, id]
        })

        await newChat.save();

        return newChat;
    }

    async getUserChats(userId: string): Promise<Chat[]> {
        return await this.chatModel.find({
            participants: userId
        })
            .populate({
                path: 'participants',
                select: '-password', // Exclude the password field
                match: { _id: { $ne: userId } }, // Exclude the user himself
            })
            .populate('messages') // Populate the messages field
            .exec();
    }

    async getChatById(chatId: string): Promise<Chat> {
        const chat = await this.chatModel.findById(chatId);
        return chat;
    }

    async insertMessage(chatId: string, message: Message) {
        // Find the chat by ID
        const chat = await this.chatModel.findById(chatId);

        if (!chat) {
            throw new NotFoundException('Chat not found');
        }

        // Push the new message ID into the messages array
        chat.messages.push(message);

        // Save the chat document with the updated messages array
        await chat.save();
    }
}
