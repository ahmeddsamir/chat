import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Chat } from './chat.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
    @Prop()
    text: string;
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: User;
    @Prop({ type: Types.ObjectId, ref: 'Chat' })
    chat: Chat;
}

export const MessageSchema = SchemaFactory.createForClass(Message);