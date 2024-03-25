import { uuid } from 'src/share/tools/uuid';
import { ICategoryEntityParams } from '../type/ICategoryEntityParams';
import { SubcategoryEntity } from '../../subcategory/entity/subcategory.entity';

export class CategoryEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description?: string;
  subcategory?: SubcategoryEntity[] = [];

  constructor(params: ICategoryEntityParams) {
    this.id = params.id || uuid();
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;

    this.title = params.title;
    this.description = params.description || undefined;
  }
}
