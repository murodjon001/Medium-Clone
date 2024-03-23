import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { AuthorEntity } from '../../entity/author.entity';
import { RegisterAuthorDto } from '../dto/register-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorDto } from '../../dto/author.dto';
import { ResetPasswordDto } from 'src/share/dtos/reset-password.dto';
import { ForgotPasswordDto } from 'src/share/dtos/forgotPassword.dto';

export interface IAuthorAuthenticationService {
  validateAuthor(email: string, password: string): Promise<AuthorEntity>;
  findAuthor(id: string): Promise<AuthorDto>;
  loginAuthor(
    author: AuthorEntity,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }>;
  updatePasswordAuthor(
    dto: UpdatePasswordDto,
    user: AuthorEntity,
  ): Promise<string>;
  registerAuthor(dto: RegisterAuthorDto): Promise<string>;
  confirmAuthor(confirmCode:string): Promise<string>
  updateAuthor(dto: UpdateAuthorDto, id: string): Promise<AuthorDto>
  forgotPasswordAuthor(dto: ForgotPasswordDto): Promise<string>;
  resetPasswordAuthor(code: string, dto: ResetPasswordDto): Promise<string>
}
