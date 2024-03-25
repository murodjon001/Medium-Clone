import { IPrismaSubcategory } from './IPrsimaSubcategory';

export interface IPrismaCategory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  subcategory?: IPrismaSubcategory[] | null;
}
