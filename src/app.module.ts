import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './bounded-contexts/administration/authentication/auth-user.module';
import { AuthorModule } from './bounded-contexts/authors/author.module';

@Module({
  imports: [AuthUserModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
