import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IAuthorRepository } from './IAuthorRepository';
import { PrismaService } from '../../prisma.service';
import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { IPrismaAuthor } from '../../interface/IPrismaAuthor';
import { Password } from 'src/share/value-objects/password-vo';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  logger = new Logger(AuthorRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<AuthorEntity> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          email,
        },
      });

      if (!author) {
        return null;
      }

      return this.mapAuhtorEntity(author);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async save(entity: AuthorEntity): Promise<AuthorEntity> {
    try {
      const saveAuthor = await this.prisma.author.upsert({
        where: {
          id: entity.id,
        },
        create: {
          id: entity.id,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          confirmCode: entity.confirmCode,
          email: entity.email,
          name: entity.name,
          password: entity.password.getHash(),
          isActive: entity.isActive,
        },
        update: {
          confirmCode: entity.confirmCode,
          email: entity.email,
          name: entity.name,
          password: entity.password.getHash(),
          isActive: entity.isActive,
        },
      });

      return this.mapAuhtorEntity(saveAuthor);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<AuthorEntity> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          id,
        },
      });

      if (!author) {
        return null;
      }

      return this.mapAuhtorEntity(author);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  private mapAuhtorEntity(payload: IPrismaAuthor) {
    const password = new Password(payload.password);

    return new AuthorEntity({ ...payload, password });
  }
}