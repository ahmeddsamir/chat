import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/schemas/chat.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ChatsController],
  providers: [
    ChatsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [MongooseModule.forFeature([{ name: "Chat", schema: ChatSchema }]), UsersModule],
  exports: [ChatsService]
})
export class ChatsModule { }
