import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastucture/prisma/prisma.service';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { IPaginatedData } from 'src/share/interfaces/IPaginatedData';
import { ICategoryRepository } from './ICategoryRepository';
import { CategoryEntity } from 'src/bounded-contexts/content/category/entity/categoty.entity';
import { IPrismaCategory } from 'src/infrastucture/prisma/interface/IPrismaCategory';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  logger = new Logger(CategoryRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: CategoryEntity): Promise<CategoryEntity> {
    try {
      const saveCategory = await this.prisma.category.upsert({
        where: {
          id: entity.id,
        },
        update: {
          title: entity.title,
          description: entity.description,
        },
        create: {
          id: entity.id,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          title: entity.title,
          description: entity.description,
        },
      });

      return this.mapCategoryEntity(saveCategory);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    pagination: PaginationDto,
  ): Promise<IPaginatedData<CategoryEntity>> {
    try {
      const categories = await this.prisma.category.findMany({
        skip: pagination.getSkip(),
        take: pagination.size,
      });

      const data = categories.map((el) => {
        return this.mapCategoryEntity(el);
      });
      const total = await this.prisma.category.count();

      return { data, total };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id,
        },
      });

      return this.mapCategoryEntity(category);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async findUnique(title: string): Promise<boolean> {
    try {
      const categoryByTitle = await this.prisma.category.count({
        where: {
          title,
        },
      });

      if (!categoryByTitle) {
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const category = await this.prisma.category.count({
        where: {
          id,
        },
      });

      if (!category) {
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findTree(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          subcategory: true,
        },
      });

      if (!category) {
        return null;
      }

      return this.mapCategoryEntity(category);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getCategoryByAuthorId(
    pagination: PaginationDto,
    authorId: string,
  ): Promise<IPaginatedData<CategoryEntity>> {
    try {
      const categories = await this.prisma.category.findMany({
        where: {
          author: {
            some: {
              id: authorId,
            },
          },
        },
        skip: pagination.getSkip(),
        take: pagination.size,
      });

      const total = await this.prisma.category.count({
        where: {
          author: {
            some: {
              id: authorId,
            },
          },
        },
      });
      const data = categories.map((el) => {
        return new CategoryEntity(el);
      });

      return { data, total };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  private mapCategoryEntity(payload: IPrismaCategory) {
    const category = new CategoryEntity(payload);

    if (payload.subcategory && payload.subcategory.length > 0) {
      category.setSubcategory(payload.subcategory);
    }

    return category;
  }
}
