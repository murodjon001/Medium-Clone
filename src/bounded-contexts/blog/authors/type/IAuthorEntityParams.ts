import { Password } from 'src/share/value-objects/password-vo';

export interface IAuthorEntityParams {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  email?: string;
  name: string;
  surname: string;
  aboutAuthor?: string;
  password: Password;
  isActive: boolean;
  confirmCode?: string;
}
