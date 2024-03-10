import { ISuperUserEntityParams } from "../types/ISuperuserEntityParams"

export class SuperUserDto {
    id?: string
    createdAt?: Date
    updatedAt?: Date
    email: string
    name?: string

    constructor(params: ISuperUserEntityParams){
        this.id = params.id
        this.createdAt = params.createdAt
        this.updatedAt = params.updatedAt
        this.email = params.email
        this.name = params.name
    }
}