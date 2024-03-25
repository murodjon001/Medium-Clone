import { CategoryEntity } from '../category/entity/categoty.entity';

export interface IContentService {
  findCategoryWithSubcategory(id: string): Promise<CategoryEntity>;
}
