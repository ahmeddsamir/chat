import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageSchema } from 'src/schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from 'src/chats/chats.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersModule } from 'src/users/users.module';
import { AppGateway } from 'src/app.gateway';


@Module({
  imports: [MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }]), ChatsModule, UsersModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppGateway
  ]
})
export class MessagesModule { }
