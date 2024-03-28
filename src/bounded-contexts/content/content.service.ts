import { Injectable, NotFoundException } from '@nestjs/common';
import { IContentService } from './type/IContentService';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import { SubcategoryRepository } from 'src/infrastucture/prisma/repository/content/subcategory/subcategory.repository';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { CategoryEntity } from './category/entity/categoty.entity';
import { SubcategoryEntity } from './subcategory/entity/subcategory.entity';

@Injectable()
export class ContentService implements IContentService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

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

  async findCategoryWithSubcategories(id: string): Promise<CategoryEntity> {
    const categoryWithSubcategory = await this.categoryRepository.findTree(id);

    if (!categoryWithSubcategory) {
      throw new NotFoundException('Category not found');
    }

    return categoryWithSubcategory;
  }

  async findSubcategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<SubcategoryEntity>> {
    const subcategries = await this.subcategoryRepository.findAll(pagination);

    return PaginationResponseDto.createFrom({
      data: subcategries.data,
      total: subcategries.total,
      page: pagination.page,
      size: pagination.size,
    });
  }

  async findSubcategory(id: string): Promise<SubcategoryEntity> {
    const subcategory = await this.subcategoryRepository.findOne(id);

    if (!subcategory) {
      throw new NotFoundException('Subcategory Not found');
    }

    return subcategory;
  }
}
