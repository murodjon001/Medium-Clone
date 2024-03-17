import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthorJwtGuard extends AuthGuard('author-jwt-guard'){}