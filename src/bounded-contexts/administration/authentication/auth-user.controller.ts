import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignInDto } from '../../../share/dtos/sign-in.dto';
import { AuthSuperUserService } from './auth-superuser.service';
import { SuperUserLocalAuthGuard } from 'src/infrastucture/security/guards/superuser-local-auth.guard';
import { GetCurrentUser } from 'src/infrastucture/decorators/get-current-user';
import { SuperUserEntity } from './entity/superuser-entity';
import { SuperUserJwtAuthGuard } from 'src/infrastucture/security/guards/superuser-jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';

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
}
