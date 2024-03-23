import { uuid } from 'src/share/tools/uuid';
import { ISuperUserEntityParams } from '../types/ISuperuserEntityParams';
import * as bcrypt from 'bcryptjs';
import { Password } from 'src/share/value-objects/password-vo';

export class SuperUserEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  confirmCode?: string;
  email: string;
  name?: string;
  password: string;

  constructor(params: ISuperUserEntityParams) {
    this.id = params.id || uuid();
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
    this.email = params.email;
    this.name = params.name;
    this.confirmCode = params.confirmCode;
    this.password = params.password;
  }

  async resetPassword(resetPassword: string) {
    const newPassword = await Password.create(resetPassword);
    this.password = newPassword.getHash();
  }

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  updatePassword(newPassword: string): void {
    this.password = newPassword;
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  getHashPassword(): string {
    return this.password;
  }
}
