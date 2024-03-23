export interface ISubcategoryEntityParams {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  title: string;
  description?: string;
  categoryId: string;
}
