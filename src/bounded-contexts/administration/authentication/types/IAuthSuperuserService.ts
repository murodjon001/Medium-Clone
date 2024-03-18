import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { SuperUserDto } from '../dto/superuser.dto';
import { SuperUserEntity } from '../entity/superuser-entity';

export interface IAuthSuperUserService {
  findSuperUserById(id: string): Promise<SuperUserDto>;
  login(superuser: SuperUserEntity): {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  validateSuperUser(email: string, password: string): Promise<SuperUserEntity>;
  updateSuperUser(dto: UpdatePasswordDto, id: string): Promise<string>;
}
