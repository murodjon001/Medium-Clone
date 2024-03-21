import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { IAuthorAuthenticationService } from './type/IAuthorAuthenticationService';
import { AuthorEntity } from '../entity/author.entity';
import {
  AUTHOR_JWT_CONSTANTS,
  IUserTokenPayload,
} from 'src/infrastucture/security/constants';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from 'src/share/dtos/update-password.dto';
import { Password } from 'src/share/value-objects/password-vo';
import { RegisterAuthorDto } from './dto/register-author.dto';
import { randomCharacters } from 'src/share/tools/generate-random-characters';
import { SendEmail } from 'src/infrastucture/mailer/send-mail';
import { AuthorDto } from '../dto/author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ResetPasswordDto } from 'src/share/dtos/reset-password.dto';
import { ForgotPasswordDto } from 'src/share/dtos/forgotPassword.dto';

@Injectable()
export class AuthorAuthenticationService
  implements IAuthorAuthenticationService
{
  logger = new Logger(AuthorAuthenticationService.name);
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly jwtService: JwtService,
    private readonly sendEmail: SendEmail,
  ) {}
  async validateAuthor(email: string, password: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.validateAuthor(email);

    if (!author) {
      throw new UnauthorizedException();
    }

    const validPassword = await author.password.compare(password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid password!');
    }

    return new AuthorEntity(author);
  }

  async registerAuthor(dto: RegisterAuthorDto): Promise<string> {
    const authorByEmail = await this.authorRepository.findByEmail(dto.email);

    if (authorByEmail) {
      throw new ForbiddenException('This email alredy exists');
    }
    const password = await Password.create(dto.password);
    const confirmCode = randomCharacters();
    const authorEntity = new AuthorEntity({
      email: dto.email,
      name: dto.name,
      password: password,
      isActive: false,
      confirmCode,
    });

    await this.sendEmail.sendVerificationEmail(dto.email, confirmCode);
    await this.authorRepository.save(authorEntity);
    return 'A verification code has been sent to your email!';
  }

  async findAuthor(id: string): Promise<AuthorDto> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new UnauthorizedException();
    }

    return new AuthorDto(author);
  }

  async loginAuthor(
    author: AuthorEntity,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const payload: IUserTokenPayload = {
      sub: author.id,
      iat: Date.now(),
      expiresIn: Date.now() + 86400000,
    }; // 24h

    const accessToken = this.jwtService.sign(payload, {
      secret: AUTHOR_JWT_CONSTANTS.secret,
      expiresIn: AUTHOR_JWT_CONSTANTS.expiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: AUTHOR_JWT_CONSTANTS.refreshSecret,
      expiresIn: AUTHOR_JWT_CONSTANTS.refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + 86400000,
    };
  }

  refreshToken(refreshToken: string): {
    accessToken: string;
    expiresIn: number;
  } {
    try {
      const verifiedToken: IUserTokenPayload = this.jwtService.verify(
        refreshToken,
        {
          secret: AUTHOR_JWT_CONSTANTS.refreshSecret,
        },
      );
      const payload: IUserTokenPayload = {
        sub: verifiedToken.sub,
        iat: Date.now(),
        expiresIn: Date.now() + 86400000,
      }; // 24h

      const accessToken = this.jwtService.sign(payload, {
        secret: AUTHOR_JWT_CONSTANTS.secret,
        expiresIn: AUTHOR_JWT_CONSTANTS.expiresIn,
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

  async updatePasswordAuthor(
    dto: UpdatePasswordDto,
    user: AuthorEntity,
  ): Promise<string> {
    const author = await this.authorRepository.findOne(user.id)

    await this.checkPassword(dto, author);
    const updatePassword = await Password.create(dto.newPassword);
    author.password = updatePassword;
    await this.authorRepository.save(author);

    return 'success';
  }

  async confirmAuthor(confirmCode: string): Promise<string> {
    const author = await this.authorRepository.findByConfirmCode(confirmCode);

    if (!author) {
      throw new ForbiddenException('Invalid confirm code!');
    }

    author.isActive = true;
    await this.authorRepository.save(author);
    return 'success';
  }

  async updateAuthor(dto: UpdateAuthorDto, id: string): Promise<AuthorDto> {
    const author = await this.authorRepository.findOne(id);
    author.updateAuthor(dto);

    const saveAuthor = await this.authorRepository.save(author);
    return new AuthorDto(saveAuthor);
  }


  async forgotPasswordAuthor(dto: ForgotPasswordDto): Promise<string> {
    const author = await this.authorRepository.findByEmail(dto.email);

    if (!author) {
      throw new NotFoundException('Email not found');
    }

    await this.sendEmail.sendResetPasswordInstructions(
      author.email,
      author.confirmCode,
    );

    return 'Instruction send you email!';
  }

  async resetPasswordAuthor(
    code: string,
    password: ResetPasswordDto,
  ): Promise<string> {
    const author = await this.authorRepository.findByConfirmCode(code);

    if (!author) {
      throw new ForbiddenException('Invalid code!');
    }
    const newPassword = await Password.create(password.resetPassword);
    author.password = newPassword

    await this.authorRepository.save(author);

    return 'success';
  }

  private async checkPassword(
    dto: UpdatePasswordDto,
    user: AuthorEntity,
  ): Promise<void> {
    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException(
        'newPassword and confirmNewPassword not the same!',
      );
    }
    const validOldPassword = await user.password.compare(dto.oldPassword);

    if (!validOldPassword) {
      throw new ForbiddenException('oldPassword invalid!');
    }
  }
}
