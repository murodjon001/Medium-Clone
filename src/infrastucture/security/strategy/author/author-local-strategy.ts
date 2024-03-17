import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorAuthenticationService } from 'src/bounded-contexts/authors/authentication/author-authentication.service';

@Injectable()
export class AuthorLocalAuthStrategy extends PassportStrategy(
  Strategy,
  'author-local-guard',
) {
  constructor(private authorService: AuthorAuthenticationService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {

    const user = await this.authorService.validateAuthor(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}