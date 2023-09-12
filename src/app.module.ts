import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/chat'), UsersModule, AuthModule, ChatsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
