import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorAuthenticationService } from './author-authentication.service';
import { AuthorJwtGuard } from 'src/infrastucture/security/guards/author/author-jwt-auth.guard';
import { GetCurrentUser } from 'src/infrastucture/decorators/get-current-user';
import { AuthorEntity } from '../entity/author.entity';
import { AuthorLocalGuard } from 'src/infrastucture/security/guards/author/author-local-auth.guard';
import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { RefreshTokenDto } from 'src/share/dtos/refresh-token.dto';
import { RegisterAuthorDto } from './dto/register-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ForgotPasswordDto } from 'src/share/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/share/dtos/reset-password.dto';

@Controller('author/authentication')
export class AuthorAuthenticationController {
  constructor(private readonly service: AuthorAuthenticationService) {}

  @UseGuards(AuthorLocalGuard)
  @Post('login')
  login(@GetCurrentUser() user: AuthorEntity) {
    return this.service.loginAuthor(user);
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
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.service.refreshToken(dto.refreshToken);
  }

  @Post('register-author')
  registerAuthor(@Body() dto: RegisterAuthorDto) {
    return this.service.registerAuthor(dto);
  }

  @Post('confirm-code/:code')
  confirmAuthor(@Param('code') code: string) {
    return this.service.confirmAuthor(code);
  }

  @UseGuards(AuthorJwtGuard)
  @Patch('update-author')
  updateAuthor(
    @Body() dto: UpdateAuthorDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.updateAuthor(dto, user.id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.service.forgotPasswordAuthor(dto);
  }

  @Post('reset-password/:code')
  resetPassword(@Body() dto: ResetPasswordDto, @Param('code') code: string) {
    return this.service.resetPasswordAuthor(code, dto);
  }
}
