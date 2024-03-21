import { SuperUserEntity } from 'src/bounded-contexts/administration/authentication/entity/superuser-entity';

export interface ISuperUserRepository {
  findById(id: string): Promise<SuperUserEntity>;
  findByEmail(email: string): Promise<SuperUserEntity>;
  save(entity: SuperUserEntity): Promise<SuperUserEntity>;
  findByCode(code: string): Promise<SuperUserEntity>;
}
