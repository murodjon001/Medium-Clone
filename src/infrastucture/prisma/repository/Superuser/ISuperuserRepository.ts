import { SuperUserEntity } from "src/bounded-contexts/administration/authentication/entity/superuser-entity";

export interface ISuperUserRepository{
    findById(id: string): Promise<SuperUserEntity>
    findByEmail(email: string): Promise<SuperUserEntity>
}