import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Message } from "./schemas/message.schema";

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // @SubscribeMessage('message')
    // handleMessage(@MessageBody() message: Message): void {
    //     // Broadcast the message to all clients in the same chat room
    //     console.log(`Client sent message: ${message}`);
    //     this.server.emit('message', message);
    // }

    @SubscribeMessage('join chat')
    handleJoinChat(@MessageBody() chatId: string, @ConnectedSocket() client: Socket): void {
        // Join the chat room using the provided chatId
        this.server.to(chatId).emit('chat joined', chatId);
        client.join(chatId);
        console.log(`Client conncted to chat: ${chatId}`);
    }

    // Implement the following two methods to handle client connections and disconnections
    handleConnection(client: Socket): void {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket): void {
        console.log(`Client disconnected: ${client.id}`);
    }
}
