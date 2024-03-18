import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { AuthorEntity } from '../../entity/author.entity';

export interface IAuthorAuthenticationService {
  validateAuthor(email: string, password: string): Promise<AuthorEntity>;
  findAuthor(id: string): Promise<AuthorEntity>;
  loginAuthor(
    author: AuthorEntity,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }>;
  updateAuthor(dto: UpdatePasswordDto, user: AuthorEntity): Promise<string>;

}
