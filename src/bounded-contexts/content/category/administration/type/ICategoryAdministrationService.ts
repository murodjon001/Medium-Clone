import { AddCategoryDto } from '../dto/add-category.dto';
import { CategoryEntity } from '../../entity/categoty.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';

export interface ICategoryAdministrationService {
  addCategory(dto: AddCategoryDto): Promise<CategoryEntity>;
  updateCategory(dto: UpdateCategoryDto, id: string): Promise<CategoryEntity>;
  findCategory(id: string): Promise<CategoryEntity>;
  findCategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<CategoryEntity>>;
  deleteCategory(id: string): Promise<string>;
}
