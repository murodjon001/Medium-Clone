import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { AddSubcategoryDto } from '../dto/add-sucategory.dto';
import { SubcategoryEntity } from '../../entity/subcategory.entity';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';

export interface ISubcategoryAdministrationService {
  addSubcategory(dto: AddSubcategoryDto): Promise<SubcategoryEntity>;
  updateSubcategory(
    dto: UpdateSubcategoryDto,
    id: string,
  ): Promise<SubcategoryEntity>;
  findSubcategory(id: string): Promise<SubcategoryEntity>;
  findSubcategories(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<SubcategoryEntity>>;
  deleteSubcategory(id: string): Promise<string>;
}
