import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthUserService } from './auth-user.service';

@Controller('auth-users')
export class AuthUserController {
    constructor(private readonly service: AuthUserService){}

    @Post('sign-in')
    signIn(@Body() dto: SignInDto){
        return this.service.signIn(dto)
    }
}
