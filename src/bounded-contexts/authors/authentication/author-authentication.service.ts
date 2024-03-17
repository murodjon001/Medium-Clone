import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { IAuthorAuthenticationService } from './type/IAuthorAuthentication.service';
import { AuthorEntity } from '../entity/author.entity';

@Injectable()
export class AuthorAuthenticationService
  implements IAuthorAuthenticationService
{
  constructor(private readonly authorService: AuthorRepository) {}
  async validateAuthor(email: string, password: string): Promise<AuthorEntity> {
    const author = await this.authorService.findByEmail(email);

    if (!author) {
      return null;
    }

    return new AuthorEntity(author);
  }

  async findAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorService.findOne(id);

    if (!author) {
      throw new UnauthorizedException();
    }

    return new AuthorEntity(author);
  }
}
