import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastucture/prisma/prisma.module';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { AuthorAuthenticationService } from './authentication/author-authentication.service';
import { AuthorLocalAuthStrategy } from 'src/infrastucture/security/strategy/author/author-local-strategy';
import { AuthorJwtAuthStrategy } from 'src/infrastucture/security/strategy/author/author-jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { AUTHOR_JWT_CONSTANTS } from 'src/infrastucture/security/constants';
import { AuthorAuthenticationController } from './authentication/author-authentication.controller';
import { SendEmail } from 'src/infrastucture/mailer/send-mail';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: AUTHOR_JWT_CONSTANTS.secret,
      global: true,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [
    AuthorRepository,
    AuthorAuthenticationService,
    AuthorLocalAuthStrategy,
    AuthorJwtAuthStrategy,
    SendEmail,
  ],
  controllers: [AuthorAuthenticationController],
})
export class AuthorModule {}
