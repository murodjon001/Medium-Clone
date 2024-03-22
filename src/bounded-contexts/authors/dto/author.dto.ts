import { AuthorEntity } from '../entity/author.entity';

export class AuthorDto {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  email: string;
  name: string;
  surname: string;
  aboutAuthor: string;

  constructor(params: AuthorEntity) {
    this.id = params.id;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.email = params.email;
    this.name = params.name;
    this.surname = params.surname;
    this.aboutAuthor = this.aboutAuthor;
    this.isActive = params.isActive;
  }
}
