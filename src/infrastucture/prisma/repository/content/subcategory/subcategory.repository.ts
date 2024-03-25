import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ISubcategoryRepository } from './ISubcategotyRepository';
import { PrismaService } from 'src/infrastucture/prisma/prisma.service';
import { SubcategoryEntity } from 'src/bounded-contexts/content/subcategory/entity/subcategory.entity';
import { IPrismaSubcategory } from 'src/infrastucture/prisma/interface/IPrsimaSubcategory';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { IPaginatedData } from 'src/share/interfaces/IPaginatedData';

@Injectable()
export class SubcategoryRepository implements ISubcategoryRepository {
  logger = new Logger(SubcategoryRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: SubcategoryEntity): Promise<SubcategoryEntity> {
    try {
      const saveSubcategory = await this.prisma.subcategory.upsert({
        where: {
          id: entity.id,
        },
        update: {
          title: entity.title,
          description: entity.description,
          categoryId: entity.categoryId,
        },
        create: {
          id: entity.id,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          title: entity.title,
          description: entity.description,
          categoryId: entity.categoryId,
        },
      });

      return this.mapSubcategoryEntity(saveSubcategory);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    pagination: PaginationDto,
  ): Promise<IPaginatedData<SubcategoryEntity>> {
    try {
      const subcategories = await this.prisma.subcategory.findMany({
        skip: pagination.getSkip(),
        take: pagination.size,
      });

      const data = subcategories.map((el) => {
        return this.mapSubcategoryEntity(el);
      });
      const total = await this.prisma.subcategory.count();

      return { data, total };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<SubcategoryEntity> {
    try {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: {
          id,
        },
      });

      return this.mapSubcategoryEntity(subcategory);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<string> {
    await this.prisma.subcategory.delete({
      where: {
        id,
      },
    });

    return 'success';
  }

  async findUnique(title: string): Promise<boolean> {
    try {
      const subcategoryByTitle = await this.prisma.subcategory.count({
        where: {
          title,
        },
      });

      if (!subcategoryByTitle) {
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
      const subcategory = await this.prisma.subcategory.count({
        where: {
          id,
        },
      });

      if (!subcategory) {
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }


  private mapSubcategoryEntity(payload: IPrismaSubcategory) {
    return new SubcategoryEntity(payload);
  }
}
