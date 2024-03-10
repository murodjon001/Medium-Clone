import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SuperUserLocalAuthGuard extends AuthGuard('superuser-local') {}