import {
  BadRequestException,
  ForbiddenException,
  Injectable,
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

@Injectable()
export class AuthorAuthenticationService
  implements IAuthorAuthenticationService
{
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly jwtService: JwtService,
  ) {}
  async validateAuthor(email: string, password: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findByEmail(email);

    if (!author) {
      throw new UnauthorizedException();
    }

    const validPassword = author.password.compare(password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid password!');
    }

    return new AuthorEntity(author);
  }

  async findAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new UnauthorizedException();
    }

    return new AuthorEntity(author);
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

  async updatePasswordAuthor(
    dto: UpdatePasswordDto,
    user: AuthorEntity,
  ): Promise<string> {
    await this.checkPassword(dto, user);

    const updatePassword = new Password(dto.newPassword);
    user.password = updatePassword;
    await this.authorRepository.save(user);

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

    const validOldPassword = user.password.compare(dto.oldPassword);

    if (!validOldPassword) {
      throw new ForbiddenException('oldPassword invalid!');
    }
  }
}
