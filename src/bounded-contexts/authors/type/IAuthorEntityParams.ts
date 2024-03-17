export interface IAuthorEntityParams {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  email: string;
  name: string;
  password: string;
  isActive: boolean;
  confirmCode?: string;
}
