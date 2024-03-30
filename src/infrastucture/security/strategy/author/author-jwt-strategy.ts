import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AUTHOR_JWT_CONSTANTS } from '../../constants';
import { AuthorAuthenticationService } from 'src/bounded-contexts/blog/authors/authentication/author-authentication.service';

@Injectable()
export class AuthorJwtAuthStrategy extends PassportStrategy(
  Strategy,
  'author-jwt-guard',
) {
  constructor(private readonly authorService: AuthorAuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTHOR_JWT_CONSTANTS.secret,
    });
  }
  async validate(payload) {
    const user = await this.authorService.findAuthor(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}
