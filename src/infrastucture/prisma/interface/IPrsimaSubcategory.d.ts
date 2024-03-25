export interface IPrismaSubcategory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  categoryId: string;
}
