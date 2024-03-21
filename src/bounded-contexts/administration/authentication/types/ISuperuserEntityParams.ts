import { Password } from "src/share/value-objects/password-vo";

export interface ISuperUserEntityParams {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  confirmCode?: string;
  email: string;
  name?: string;
  password: string;
}
