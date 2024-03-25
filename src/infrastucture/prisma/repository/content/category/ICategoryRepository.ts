import { CategoryEntity } from 'src/bounded-contexts/content/category/entity/categoty.entity';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { IPaginatedData } from 'src/share/interfaces/IPaginatedData';

export interface ICategoryRepository {
  save(entity: CategoryEntity): Promise<CategoryEntity>;
  findAll(pagination: PaginationDto): Promise<IPaginatedData<CategoryEntity>>;
  findOne(id: string): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
  findUnique(title: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  findTree(id: string): Promise<CategoryEntity>;
}
