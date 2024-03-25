import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICategoryAdministrationService } from './type/ICategoryAdministrationService';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import { CategoryEntity } from '../entity/categoty.entity';
import { AddCategoryDto } from './dto/add-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';

@Injectable()
export class CategoryAdministrationService
  implements ICategoryAdministrationService
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async addCategory(dto: AddCategoryDto): Promise<CategoryEntity> {
    await this.checkUniqueTitle(dto.title);

    const categoryEntity = new CategoryEntity({
      title: dto.title,
      description: dto.description,
    });

    const saveCategory = await this.categoryRepository.save(categoryEntity);

    return saveCategory;
  }

  async updateCategory(
    dto: UpdateCategoryDto,
    id: string,
  ): Promise<CategoryEntity> {
    await this.checkCategoryById(id);
    await this.checkUniqueTitle(dto.title);

    const categoryEntity = new CategoryEntity({
      title: dto.title,
      description: dto.description,
    });

    const saveCategory = await this.categoryRepository.save(categoryEntity);

    return saveCategory;
  }

  async findCategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<CategoryEntity>> {
    const categories = await this.categoryRepository.findAll(pagination);

    return PaginationResponseDto.createFrom({
      data: categories.data,
      total: categories.total,
      page: pagination.page,
      size: pagination.size,
    });
  }

  async findCategory(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async deleteCategory(id: string): Promise<string> {
    await this.checkCategoryById(id);
    await this.categoryRepository.delete(id);

    return 'success';
  }

  private async checkUniqueTitle(title: string): Promise<void> {
    const categoryByTitle = await this.categoryRepository.findUnique(title);

    if (categoryByTitle) {
      throw new ConflictException('Category title alredy exist');
    }
  }

  private async checkCategoryById(id: string): Promise<void> {
    const category = await this.categoryRepository.exists(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
