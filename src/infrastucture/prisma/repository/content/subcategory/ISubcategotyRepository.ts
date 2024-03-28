import { SubcategoryEntity } from 'src/bounded-contexts/content/subcategory/entity/subcategory.entity';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { IPaginatedData } from 'src/share/interfaces/IPaginatedData';

export interface ISubcategoryRepository {
  save(entity: SubcategoryEntity): Promise<SubcategoryEntity>;
  findAll(
    pagination: PaginationDto,
  ): Promise<IPaginatedData<SubcategoryEntity>>;
  findOne(id: string): Promise<SubcategoryEntity>;
  delete(id: string): Promise<string>;
  findUnique(title: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  getSubcategoryByAuthorId(
    pagination: PaginationDto,
    authorId: string,
  ): Promise<IPaginatedData<SubcategoryEntity>>;
}
