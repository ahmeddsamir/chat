import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';

export type ChatDocument = HydratedDocument<Chat>;

// export enum ChatType {
//     OneToOne = 'one-to-one',
//     Group = 'group',
// }

@Schema()
export class Chat {
    // @Prop({ required: true })
    // type: ChatType;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    participants: User[];

    @Prop()
    groupName: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
    messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);





