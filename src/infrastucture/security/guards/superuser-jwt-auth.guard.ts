import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SuperUserJwtAuthGuard extends AuthGuard('superuser-jwt') {}