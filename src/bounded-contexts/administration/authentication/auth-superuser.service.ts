import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuperUserRepository } from 'src/infrastucture/prisma/repository/superuser/superuser.repository';
import { SuperUserEntity } from './entity/superuser-entity';
import {
  IUserTokenPayload,
  SUPER_USER_JWT_CONSTANTS,
} from 'src/infrastucture/security/constants';
import { SuperUserDto } from './dto/superuser.dto';
import { IAuthSuperUserService } from './types/IAuthSuperuserService';
import { UpdateUserDto } from 'src/share/dtos/update-user.dto';

@Injectable()
export class AuthSuperUserService implements IAuthSuperUserService {
  logger = new Logger(AuthSuperUserService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly superuserRepository: SuperUserRepository,
  ) {}

  async findSuperUserById(id: string): Promise<SuperUserDto> {
    const superUser = await this.superuserRepository.findById(id);

    if (!superUser) {
      throw new UnauthorizedException();
    }

    return new SuperUserDto(superUser);
  }

  login(superuser: SuperUserEntity): {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  } {
    const payload: IUserTokenPayload = {
      sub: superuser.id,
      iat: Date.now(),
      expiresIn: Date.now() + 86400000,
    }; // 24h

    const accessToken = this.jwtService.sign(payload, {
      secret: SUPER_USER_JWT_CONSTANTS.secret,
      expiresIn: SUPER_USER_JWT_CONSTANTS.expiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: SUPER_USER_JWT_CONSTANTS.refreshSecret,
      expiresIn: SUPER_USER_JWT_CONSTANTS.refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + 86400000,
    };
  }

  async validateSuperUser(
    email: string,
    password: string,
  ): Promise<SuperUserEntity> {
    const user = await this.superuserRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const superUserEntity = new SuperUserEntity(user);
    const validatePassword = superUserEntity.validatePassword(password);

    if (!validatePassword) {
      return null;
    }
    return user;
  }

  refreshToken(refreshToken: string): {
    accessToken: string;
    expiresIn: number;
  } {
    try {
      const verifiedToken: IUserTokenPayload = this.jwtService.verify(
        refreshToken,
        {
          secret: SUPER_USER_JWT_CONSTANTS.refreshSecret,
        },
      );
      const payload: IUserTokenPayload = {
        sub: verifiedToken.sub,
        iat: Date.now(),
        expiresIn: Date.now() + 86400000,
      }; // 24h

      const accessToken = this.jwtService.sign(payload, {
        secret: SUPER_USER_JWT_CONSTANTS.secret,
        expiresIn: SUPER_USER_JWT_CONSTANTS.expiresIn,
      });

      return {
        accessToken,
        expiresIn: new Date().getTime() + 86400000,
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }

  async updateSuperUser(dto: UpdateUserDto, id: string): Promise<string> {
    const superuser = await this.superuserRepository.findById(id);
    this.checkPassword(dto, superuser);
    superuser.updatePassword(dto.newPassword);
    superuser.hashPassword();

    await this.superuserRepository.save(superuser);
    return 'success';
  }

  private checkPassword(dto: UpdateUserDto, entity: SuperUserEntity): void {
    if (dto.confirmNewPassword !== dto.newPassword) {
      throw new BadRequestException(
        'confirmPassword and newPassword is not the same!',
      );
    }
    console.log(entity);
    const validatePassword = entity.validatePassword(dto.oldPassword);

    if (!validatePassword) {
      throw new ForbiddenException('oldPassword is not found database');
    }
  }
}
