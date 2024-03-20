import { Password } from 'src/share/value-objects/password-vo';
import { IAuthorEntityParams } from '../type/IAuthorEntityParams';
import * as bcrypt from 'bcryptjs';
import { uuid } from 'src/share/tools/uuid';

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

  setPosts(posts: []) {
    this.posts = posts;
  }

  setComments(comments: []) {
    this.comments = comments;
  }

  setLikePost(likePosts: []) {
    this.likePost = likePosts;
  }
}
