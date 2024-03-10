import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSuperUserService } from 'src/bounded-contexts/administration/authentication/auth-superuser.service';

@Injectable()
export class SuperUserLocalAuthStrategy extends PassportStrategy(
  Strategy,
  'superuser-local',
) {
  constructor(private authService: AuthSuperUserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {

    const user = await this.authService.validateSuperUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}