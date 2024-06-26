import { Module } from '@nestjs/common';
import { AuthSuperUserService } from './superuser-authentication.service';
import { AuthSuperUserController } from './superuser-authentication.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SUPER_USER_JWT_CONSTANTS } from '../../../infrastucture/security/constants';
import { SuperUserRepository } from 'src/infrastucture/prisma/repository/superuser/superuser.repository';
import { SuperUserLocalAuthStrategy } from 'src/infrastucture/security/strategy/superuser-local-strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/infrastucture/prisma/prisma.module';
import { SuperUserJwtAuthStrategy } from 'src/infrastucture/security/strategy/superuser-jwt-strategy';
import { SendEmail } from 'src/infrastucture/mailer/send-mail';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: SUPER_USER_JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [
    AuthSuperUserService,
    JwtService,
    SuperUserRepository,
    SuperUserLocalAuthStrategy,
    SuperUserJwtAuthStrategy,
    SendEmail,
  ],
  controllers: [AuthSuperUserController],
  exports: [JwtModule],
})
export class AuthUserModule {}
