import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { AuthorEntity } from '../../entity/author.entity';
import { RegisterAuthorDto } from '../dto/register.dto';

export interface IAuthorAuthenticationService {
  validateAuthor(email: string, password: string): Promise<AuthorEntity>;
  findAuthor(id: string): Promise<AuthorEntity>;
  loginAuthor(
    author: AuthorEntity,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }>;
  updatePasswordAuthor(
    dto: UpdatePasswordDto,
    user: AuthorEntity,
  ): Promise<string>;
  registerAuthor(dto: RegisterAuthorDto): Promise<string>;
}
