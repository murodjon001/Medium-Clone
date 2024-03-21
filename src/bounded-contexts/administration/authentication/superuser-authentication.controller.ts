import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SignInDto } from '../../../share/dtos/sign-in.dto';
import { AuthSuperUserService } from './superuser-authentication.service';
import { SuperUserLocalAuthGuard } from 'src/infrastucture/security/guards/superuser-local-auth.guard';
import { GetCurrentUser } from 'src/infrastucture/decorators/get-current-user';
import { SuperUserEntity } from './entity/superuser-entity';
import { SuperUserJwtAuthGuard } from 'src/infrastucture/security/guards/superuser-jwt-auth.guard';
import { RefreshTokenDto } from '../../../share/dtos/refresh-token.dto';
import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { ForgotPasswordDto } from 'src/share/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/share/dtos/reset-password.dto';

@Controller('superusers')
export class AuthSuperUserController {
  constructor(private readonly service: AuthSuperUserService) {}

  @UseGuards(SuperUserLocalAuthGuard)
  @Post('login')
  loginSuperUser(@GetCurrentUser() user: SuperUserEntity) {
    return this.service.login(user);
  }

  @UseGuards(SuperUserJwtAuthGuard)
  @Get()
  findSuperUser(@GetCurrentUser() user: SuperUserEntity) {
    return this.service.findSuperUserById(user.id);
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.service.refreshToken(refreshToken.refreshToken);
  }

  @UseGuards(SuperUserJwtAuthGuard)
  @Post('update-password')
  updatePassword(
    @Body() dto: UpdatePasswordDto,
    @GetCurrentUser() user: SuperUserEntity,
  ) {
    return this.service.updateSuperUser(dto, user.id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.service.forgotPassword(dto);
  }

  @Post('reset-password/:code')
  resetPassword(@Body() dto: ResetPasswordDto, @Param('code') code: string) {
    return this.service.resetPassword(code, dto);
  }
}
