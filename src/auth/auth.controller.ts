import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Render,
    Req,
    Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.public';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body('email') email: string,
        @Body('password') password: string,
        @Req() request: Request,
        @Res() response: Response
    ) {
        const result = await this.authService.signIn(email, password);
        request.session.token = result.data.access_token;
        response.redirect('../user');
        // console.log(request.session.token, 1)
        // return result;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Get('login')
    @Render('login')
    renderSignIn() {

    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') pass: string,
        @Body('username') username: string,
        @Body('name') name: string,
        @Req() request: Request,
        @Res() response: Response
    ) {
        const result = await this.authService.register(email, pass, username, name);
        request.session.token = result.data.access_token;
        response.redirect('../user');
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Get('register')
    @Render('register')
    renderRegister() {

    }
}
