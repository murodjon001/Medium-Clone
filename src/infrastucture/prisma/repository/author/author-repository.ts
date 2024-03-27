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
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { IPaginatedData } from 'src/share/interfaces/IPaginatedData';
import { AttachOrSeparateCategoryAuthorDto } from 'src/bounded-contexts/content/category/author/dto/attach-or-separate-category-author.dto';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  logger = new Logger(AuthorRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async validateAuthor(email: string): Promise<AuthorEntity> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          email,
          isActive: true,
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

  async findAll(
    pagination: PaginationDto,
  ): Promise<IPaginatedData<AuthorEntity>> {
    try {
      const authors = await this.prisma.author.findMany({
        skip: pagination.getSkip(),
        take: pagination.page,
      });

      const total = await this.prisma.author.count();
      const data = authors.map((el) => {
        return this.mapAuhtorEntity(el);
      });

      return { data, total };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

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
          surname: entity.surname,
          aboutAuthor: entity.aboutAuthor,
          password: entity.password.getHash(),
          isActive: entity.isActive,
        },
        update: {
          confirmCode: entity.confirmCode,
          email: entity.email,
          name: entity.name,
          password: entity.password.getHash(),
          isActive: entity.isActive,
          surname: entity.surname,
          aboutAuthor: entity.aboutAuthor,
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

  async findByConfirmCode(confirmCode: string): Promise<AuthorEntity> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          confirmCode,
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

  async connectCategory(
    dto: AttachOrSeparateCategoryAuthorDto,
    authorId: string
  ): Promise<void> {
    try {
      await this.prisma.author.update({
        where:{
          id: authorId
        },
        data:{
          category:{
            connect: dto.categoryIds.map((el) => {return {id: el}})
          }
        }
      })
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async disconnectCategory(dto: AttachOrSeparateCategoryAuthorDto, authorId: string): Promise<void> {
    try {
      await this.prisma.author.update({
        where:{
          id: authorId
        },
        data:{
          category:{
            disconnect: dto.categoryIds.map((el) => {return {id: el}})
          }
        }
      })
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
