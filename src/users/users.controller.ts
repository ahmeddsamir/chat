import { Controller, Post, Body, Get, Param, Patch, Header, HttpCode, HttpStatus, Render, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Public } from "src/auth/auth.public";
import { Request } from "express";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Get('')
    @Render('users')
    // @Public()
    async renderUsers(@Req() request: Request) {
        const users = await this.userService.findAllUsers();
        console.log(users, 11);
        console.log(request['user'], 22);
        return { users, user: request['user']}
    }
}