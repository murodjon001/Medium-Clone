import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    // Chal qoldi dcumentatsya auth Guard dan ko'ridh kersk~

    //secret keyni .env faylidan mavjudligini tekshirish kerak console,log orqali!
}