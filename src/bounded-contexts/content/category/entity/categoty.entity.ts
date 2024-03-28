import { uuid } from 'src/share/tools/uuid';
import { ICategoryEntityParams } from '../type/ICategoryEntityParams';
import { SubcategoryEntity } from '../../subcategory/entity/subcategory.entity';
import { ISubcategoryEntityParams } from '../../subcategory/type/ISubcategoryEntityParams';

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

  setSubcategory(params: ISubcategoryEntityParams[]): void {
    this.subcategory = params.map((el) => new SubcategoryEntity(el));
  }
}
