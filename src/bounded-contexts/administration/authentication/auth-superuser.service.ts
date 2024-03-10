import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuperUserRepository } from 'src/infrastucture/prisma/repository/Superuser/superuser.repository';
import { SuperUserEntity } from './entity/superuser-entity';
import { ISuperUserTokenPayload, SUPER_USER_JWT_CONSTANTS } from 'src/infrastucture/security/constants';
import { SuperUserDto } from './dto/superuser.dto';

@Injectable()
export class AuthSuperUserService {
  logger = new Logger(AuthSuperUserService.name)
  constructor(
    private readonly jwtService: JwtService,
    private readonly superuserRepository: SuperUserRepository
  ) {}

  async findSuperUserById(id: string): Promise<SuperUserDto>{
    const superUser = await this.superuserRepository.findById(id)

    if (!superUser) {
      throw new UnauthorizedException()
    }

    return new SuperUserDto(superUser)
  }

  login(superuser: SuperUserEntity): {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  } {
    const payload: ISuperUserTokenPayload = {
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

  async validateSuperUser(email: string, password: string) {
    const user = await this.superuserRepository.findByEmail(email)
    if (!user) {
      return null
    }
    const superUserEntity = new SuperUserEntity(user)
    const validatePassword = superUserEntity.validatePassword(password)

    if (!validatePassword) {
      return null
    }
    return user
  }

  refreshToken(refreshToken: string): {
    accessToken: string;
    expiresIn: number;
  } {
    try {
      const verifiedToken: ISuperUserTokenPayload = this.jwtService.verify(
        refreshToken,
        {
          secret: SUPER_USER_JWT_CONSTANTS.refreshSecret,
        },
      );
      const payload: ISuperUserTokenPayload = {
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
      throw new UnauthorizedException()
    }
  }

}
