import { UpdateUserDto } from "src/share/dtos/update-user.dto";
import { SuperUserDto } from "../dto/superuser.dto";
import { SuperUserEntity } from "../entity/superuser-entity";

export interface IAuthSuperUserService{
    findSuperUserById(id: string): Promise<SuperUserDto>
    login(superuser: SuperUserEntity): {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      }
    validateSuperUser(email: string, password: string): Promise<SuperUserEntity>
    updateSuperUser(dto: UpdateUserDto, id: string): Promise<string>

}