import { AuthorEntity } from '../../entity/author.entity';

export interface IAuthorAuthenticationService {
  validateAuthor(email: string, password: string): Promise<AuthorEntity>;
  findAuthor(id: string): Promise<AuthorEntity>;
}
