import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthUserService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaClient,
  ) {
    this.prisma = new PrismaClient();
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    
    if(!user){
      throw new UnauthorizedException(
        'This user not registrated this platform!',
      );
    }
    const password = (await bcrypt.compare(dto.password, user.password));

    if (!password) {
      throw new UnauthorizedException(
        'This user not registrated this platform!',
      );
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {secret: process.env.SECRET_KEY}),
    };
  }
}
