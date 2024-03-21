import { IPrismaAuthor } from 'src/infrastucture/prisma/interface/IPrismaAuthor';
import { AuthorEntity } from '../entity/author.entity';

export class AuthorDto {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  email: string;
  name: string;

  constructor(params: AuthorEntity) {
    this.id = params.id;
    (this.createdAt = params.createdAt), (this.updatedAt = params.updatedAt);
    this.email = params.email;
    this.name = params.name;
    this.isActive = params.isActive;
  }
}
