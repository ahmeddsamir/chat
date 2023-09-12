import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Wrong Credentials.');
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Wrong Credentials.');
        }
        const { password, ...result } = user;

        const payload = { sub: user._id, email: user.email, name: user.name };

        return {
            success: true,
            data: {
                user: result,
                access_token: await this.jwtService.signAsync(payload)
            }
        }
    }

    async register(email: string, password: string, username: string, name: string) {
        const user = await this.userService.findUserByEmail(email);
        if (user) {
            throw new UnauthorizedException('Email already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertedUser = await this.userService.insertUser(email, hashedPassword, username, name);
        const payload = { sub: insertedUser._id, email: email, name: name };
        return {
            success: true,
            data: {
                user: {...insertedUser},
                access_token: await this.jwtService.signAsync(payload)
            }
        }
    }
}
