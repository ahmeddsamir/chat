import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ChatsService } from 'src/chats/chats.service';

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService,
        private readonly chatsService: ChatsService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post(':id/send')
    async sendMessage(@Param('id') chatId: string, @Body('text') text: string, @Request() req) {
        const message = await this.messagesService.sendMessage(req.user.sub, chatId, text);
        this.chatsService.insertMessage(chatId, message);
        return message;
    }
}
