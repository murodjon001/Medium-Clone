import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { SuperUserDto } from '../dto/superuser.dto';
import { SuperUserEntity } from '../entity/superuser-entity';
import { ForgotPasswordDto } from '../../../../share/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/share/dtos/reset-password.dto';

export interface IAuthenticationSuperUserService {
  findSuperUserById(id: string): Promise<SuperUserDto>;
  login(superuser: SuperUserEntity): {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  validateSuperUser(email: string, password: string): Promise<SuperUserEntity>;
  updateSuperUser(dto: UpdatePasswordDto, id: string): Promise<string>;
  forgotPassword(dto: ForgotPasswordDto): Promise<string>;
  resetPassword(code: string, dto: ResetPasswordDto): Promise<string>
}
