export interface IPrismaAuthor {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  surname: string;
  aboutAuthor: string;
  confirmCode: string;
}
