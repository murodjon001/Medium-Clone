import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ISuperUserRepository } from "./ISuperuserRepository";
import { SuperUserEntity } from "src/bounded-contexts/administration/authentication/entity/superuser-entity";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class SuperUserRepository implements ISuperUserRepository{
    constructor(private readonly prisma: PrismaService){}

    logger = new Logger(SuperUserRepository.name)
    async findByEmail(email: string): Promise<SuperUserEntity> {
        try{
            const superuser = await this.prisma.superuser.findUnique({
                where:{
                    email
                }
            })

            if(!superuser){
                return null
            }

            return new SuperUserEntity(superuser)
        }catch(err){
            this.logger.error(err)
            throw new InternalServerErrorException()
        }
    }

    async findById(id: string): Promise<SuperUserEntity> {
        try{
            const superuser = await this.prisma.superuser.findUnique({
                where:{
                    id
                }
            })

            if(!superuser){
                return null
            }

            return new SuperUserEntity(superuser)
        }catch(err){
            this.logger.error(err)
            throw new InternalServerErrorException()
        }
    }

    async save(entity: SuperUserEntity): Promise<SuperUserEntity> {
        try{
            const superuser = await this.prisma.superuser.upsert({
                where:{
                    id: entity.id
                },
                create:{
                    id: entity.id,
                    confirmCode: entity.confirmCode,
                    email: entity.email,
                    password: entity.getHashPassword(),
                    name: entity.name,
                },
                update:{
                    confirmCode: entity.confirmCode,
                    email: entity.email,
                    password: entity.getHashPassword(),
                    name: entity.name,
                }
            })

            return new SuperUserEntity(superuser)
        }catch(err){
            this.logger.error(err)
            throw new InternalServerErrorException()
        }
    }
}