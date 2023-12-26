import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [JwtModule.register(
    {
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1800s'},
    }
  ),
],
  providers: [AuthUserService, JwtService, PrismaClient],
  controllers: [AuthUserController],
  exports: [AuthUserService]
})
export class AuthUserModule {}
