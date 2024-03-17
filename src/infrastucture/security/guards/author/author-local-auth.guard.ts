import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorLocalGuard extends AuthGuard('author-local-guard') {}
