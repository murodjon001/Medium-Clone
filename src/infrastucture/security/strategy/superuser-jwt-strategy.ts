import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SUPER_USER_JWT_CONSTANTS } from '../constants';
import { AuthSuperUserService } from 'src/bounded-contexts/administration/authentication/auth-superuser.service';

@Injectable()
export class SuperUserJwtAuthStrategy extends PassportStrategy(
    Strategy,
    'superuser-jwt'
    ) {
  constructor(
    private readonly superuserService: AuthSuperUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SUPER_USER_JWT_CONSTANTS.secret,
    });
  }
  async validate(payload) {
    const user = await this.superuserService.findSuperUserById(
      payload.sub,
    );
    if (!user) {
      return null;
    }
    return user;
  }
}
