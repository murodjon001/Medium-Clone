import { uuid } from 'src/share/tools/uuid';
import { ISubcategoryEntityParams } from '../type/ISubcategoryEntityParams';

export class SubcategoryEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  title: string;
  description?: string;
  categoryId: string;

  constructor(params: ISubcategoryEntityParams) {
    this.id = params.id || uuid();
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.categoryId = params.categoryId;
    this.title = params.title;
    this.description = params.description || undefined;
  }
}
