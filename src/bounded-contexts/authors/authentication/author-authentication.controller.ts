import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthorAuthenticationService } from './author-authentication.service';
import { AuthorJwtGuard } from 'src/infrastucture/security/guards/author/author-jwt-auth.guard';
import { GetCurrentUser } from 'src/infrastucture/decorators/get-current-user';
import { AuthorEntity } from '../entity/author.entity';
import { AuthorLocalGuard } from 'src/infrastucture/security/guards/author/author-local-auth.guard';
import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { RefreshTokenDto } from 'src/share/dtos/refresh-token.dto';
import { RegisterAuthorDto } from './dto/register.dto';

@Controller('author/authentication')
export class AuthorAuthenticationController {
  constructor(private readonly service: AuthorAuthenticationService) {}

  @UseGuards(AuthorLocalGuard)
  @Post('login')
  login(@GetCurrentUser() user: AuthorEntity) {
    return this.service.loginAuthor(user)
  }

  @Get()
  @UseGuards(AuthorJwtGuard)
  getAuthor(@GetCurrentUser() user: AuthorEntity) {
    return this.service.findAuthor(user.id);
  }

  @Patch('update-password')
  @UseGuards(AuthorJwtGuard)
  UpdatePasswordDto(
    @Body() dto: UpdatePasswordDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.updatePasswordAuthor(dto, user);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto){
    return this.service.refreshToken(dto.refreshToken)
  }

  @Post('register-author')
  registerAuthor(@Body() dto: RegisterAuthorDto){
    return this.service.registerAuthor(dto)
  }

}
