import { uuid } from "src/share/tools/uuid";
import { ICategoryEntityParams } from "../type/ICategoryEntityParams";

export class CategoryEntity {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  
    title: string;
    description?: string;

    constructor(params: ICategoryEntityParams){
        this.id = params.id || uuid()
        this.createdAt = params.createdAt
        this.updatedAt = params.updatedAt

        this.title = params.title
        this.description = params.description || undefined
    }
}