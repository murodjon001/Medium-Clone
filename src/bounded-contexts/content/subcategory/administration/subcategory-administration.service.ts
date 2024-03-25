import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { ISubcategoryAdministrationService } from './type/ISubcategoryAdministrationService';
import { AddSubcategoryDto } from './dto/add-sucategory.dto';
import { SubcategoryEntity } from '../entity/subcategory.entity';
import { SubcategoryRepository } from 'src/infrastucture/prisma/repository/content/subcategory/subcategory.repository';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoryAdministrationService
  implements ISubcategoryAdministrationService
{
  constructor(
    private readonly subcategoryRepository: SubcategoryRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async addSubcategory(dto: AddSubcategoryDto): Promise<SubcategoryEntity> {
    await this.checkSubcategoryById(dto.categoryId);
    await this.checkUniqueTitle(dto.title);

    const subcategoryEntity = new SubcategoryEntity({
      title: dto.title,
      description: dto.description,
      categoryId: dto.categoryId,
    });

    const saveSubcategory =
      await this.subcategoryRepository.save(subcategoryEntity);

    return saveSubcategory;
  }

  async updateSubcategory(
    dto: UpdateSubcategoryDto,
    id: string,
  ): Promise<SubcategoryEntity> {
    await this.checkSubcategoryById(id);
    await this.checkUniqueTitle(dto.title);
    await this.checkCategoryById(dto.categoryId);

    const subcategoryEntity = new SubcategoryEntity({
      title: dto.title,
      description: dto.description,
      categoryId: dto.categoryId,
    });

    const saveSubcategory =
      await this.subcategoryRepository.save(subcategoryEntity);

    return saveSubcategory;
  }

  async findSubcategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<SubcategoryEntity>> {
    const subcategories = await this.subcategoryRepository.findAll(pagination);

    return PaginationResponseDto.createFrom({
      data: subcategories.data,
      total: subcategories.total,
      page: pagination.page,
      size: pagination.size,
    });
  }

  async findSubcategory(id: string): Promise<SubcategoryEntity> {
    const subcategory = await this.subcategoryRepository.findOne(id);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }

  async deleteSubcategory(id: string): Promise<string> {
    await this.checkSubcategoryById(id);
    await this.subcategoryRepository.delete(id);

    return 'success';
  }

  private async checkUniqueTitle(title: string): Promise<void> {
    const categoryByTitle = await this.subcategoryRepository.findUnique(title);

    if (categoryByTitle) {
      throw new ConflictException('Subcategory title alredy exist');
    }
  }

  private async checkSubcategoryById(id: string): Promise<void> {
    const subcategory = await this.subcategoryRepository.exists(id);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
  }

  private async checkCategoryById(id: string): Promise<void> {
    const category = await this.categoryRepository.exists(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
