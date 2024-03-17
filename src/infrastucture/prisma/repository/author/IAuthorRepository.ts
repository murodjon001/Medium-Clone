import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';

export interface IAuthorRepository {
  findByEmail(email: string): Promise<AuthorEntity>;
  save(entity: AuthorEntity): Promise<AuthorEntity>;
  findOne(id: string): Promise<AuthorEntity>;
}
