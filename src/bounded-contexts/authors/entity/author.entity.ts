import { Password } from 'src/share/value-objects/password-vo';
import { IAuthorEntityParams } from '../type/IAuthorEntityParams';
import * as bcrypt from 'bcryptjs';
import { uuid } from 'src/share/tools/uuid';
import { UpdateAuthorDto } from '../authentication/dto/update-author.dto';

export class AuthorEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  email: string;
  name: string;
  password: Password;
  isActive: boolean;
  confirmCode?: string;

  posts = [];
  comments = [];
  likePost = [];

  constructor(params: IAuthorEntityParams) {
    this.id = params.id || uuid();
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();

    this.email = params.email;
    this.name = params.name;
    this.password = params.password;
    this.isActive = params.isActive;
    this.confirmCode = params.confirmCode || undefined;
  }

  blockAuthor(): void {
    this.isActive = false;
  }

  updateAuthor(dto: UpdateAuthorDto): void {
    this.name = dto.name;
  }

  setPosts(posts: []): void {
    this.posts = posts;
  }

  setComments(comments: []): void {
    this.comments = comments;
  }

  setLikePost(likePosts: []): void {
    this.likePost = likePosts;
  }
}
