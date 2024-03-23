import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
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
import { IAuthenticationSuperUserService } from './types/IAuthenticationSuperuserService';
import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { SendEmail } from 'src/infrastucture/mailer/send-mail';
import { ForgotPasswordDto } from '../../../share/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/share/dtos/reset-password.dto';
import { Password } from 'src/share/value-objects/password-vo';
import { randomCharacters } from 'src/share/tools/generate-random-characters';

@Injectable()
export class AuthSuperUserService implements IAuthenticationSuperUserService {
  logger = new Logger(AuthSuperUserService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly superuserRepository: SuperUserRepository,
    private readonly sendEmail: SendEmail,
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

  async forgotPassword(dto: ForgotPasswordDto): Promise<string> {
    const superuser = await this.superuserRepository.findByEmail(dto.email);

    if (!superuser) {
      throw new NotFoundException('Email not found');
    }

    await this.sendEmail.sendResetPasswordInstructions(
      superuser.email,
      superuser.confirmCode,
    );

    return 'Instruction send you email!';
  }

  async resetPassword(
    code: string,
    password: ResetPasswordDto,
  ): Promise<string> {
    const superuser = await this.superuserRepository.findByCode(code);

    if (!superuser) {
      throw new ForbiddenException('Invalid code!');
    }
    const newPassword = await Password.create(password.resetPassword);
    superuser.password = newPassword.getHash();

    await this.superuserRepository.save(superuser);

    return 'success';
  }

  async updateSuperUser(dto: UpdatePasswordDto, id: string): Promise<string> {
    const superuser = await this.superuserRepository.findById(id);
    this.checkPassword(dto, superuser);
    superuser.updatePassword(dto.newPassword);
    superuser.hashPassword();

    await this.superuserRepository.save(superuser);
    return 'success';
  }

  private checkPassword(dto: UpdatePasswordDto, entity: SuperUserEntity): void {
    if (dto.confirmNewPassword !== dto.newPassword) {
      throw new BadRequestException(
        'confirmPassword and newPassword is not the same!',
      );
    }
    const validatePassword = entity.validatePassword(dto.oldPassword);

    if (!validatePassword) {
      throw new ForbiddenException('oldPassword is not found database');
    }
  }
}
