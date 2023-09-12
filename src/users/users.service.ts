import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }, '+password');
        if (user) {
            return user;
        }
        return null;
    }

    async findUserById(id: string) {
        const user = await this.userModel.findById(id);
        if (user) {
            return user;
        }
        return null;
    }

    async findAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async insertUser(
        email: string,
        password: string,
        username: string,
        name: string
    ) {
        const user = await this.userModel.create({ email, password, username, name});
        return user;
    }
}