import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [AuthUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
