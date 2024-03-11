import { uuid } from "src/share/tools/uuid"
import { ISuperUserEntityParams } from "../types/ISuperuserEntityParams"
import * as bcrypt from 'bcryptjs';

export class SuperUserEntity {
    id?: string
    createdAt?: Date
    updatedAt?: Date

    email: string
    name?: string
    password: string
    confirmCode: string

    constructor(params: ISuperUserEntityParams){
        this.id = params.id || uuid()
        this.createdAt = params.createdAt || new Date()
        this.updatedAt = params.updatedAt || new Date()
        this.email = params.email 
        this.name = params.name
        this.password = params.password
        this.confirmCode = params.confirmCode  
    }

    hashPassword(): void{
        this.password = bcrypt.hashSync(this.password, 10)
    }

    updatePassword(newPassword: string): void {
        this.password = newPassword;
    }
    
    validatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    getHashPassword(): string{
        return this.password;
    }
    
}