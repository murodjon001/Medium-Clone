import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthorAuthenticationService } from "./author-authentication.service";
import { AuthorJwtGuard } from "src/infrastucture/security/guards/author/author-jwt-auth.guard";
import { GetCurrentUser } from "src/infrastucture/decorators/get-current-user";
import { AuthorEntity } from "../entity/author.entity";

@Controller('author/authentication')
export class AuthorAuthenticationController {
    constructor(private readonly service: AuthorAuthenticationService){}

    @UseGuards(AuthorJwtGuard)
    @Post('login')
    login(@GetCurrentUser() user: AuthorEntity){
        
    }
}