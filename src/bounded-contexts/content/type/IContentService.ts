import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { CategoryEntity } from '../category/entity/categoty.entity';
import { SubcategoryEntity } from '../subcategory/entity/subcategory.entity';

export interface IContentService {
  findCategoryWithSubcategories(id: string): Promise<CategoryEntity>;
  findSubcategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<SubcategoryEntity>>;
  findCategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<CategoryEntity>>;
  findCategory(id: string): Promise<CategoryEntity>;
  findSubcategory(id: string): Promise<SubcategoryEntity>;
}
