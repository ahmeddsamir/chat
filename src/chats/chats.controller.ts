import { Controller, Get, HttpCode, HttpStatus, Param, Post, Request, Render } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { UsersService } from 'src/users/users.service';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService, private readonly userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @Render('chat')
    async getOrCreateChat(@Param('id') id: string, @Request() req) {
        const otherUser = await this.userService.findUserById(id);
        const me = req.user;
        const chat = await this.chatsService.getOrCreateChat(me.sub, id);
        return {chat, otherUser, me};
    }

    @HttpCode(HttpStatus.OK)
    @Get('')
    getUserChats(@Request() req) {
        return this.chatsService.getUserChats(req.user.sub);
    }

}
