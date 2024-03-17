import { IAuthorEntityParams } from "../type/IAuthorEntityParams"
import * as bcrypt from 'bcryptjs';

export class AuthorEntity{
    id?: string
    createdAt?: Date
    updatedAt?: Date

    email: string
    name: string
    password: string
    isActive: boolean
    confirmCode?: string    

    posts = []
    comments = []
    likePost = []

    constructor(params: IAuthorEntityParams){
        this.id = params.id || undefined
        this.createdAt = params.createdAt || undefined
        this.updatedAt = params.updatedAt || undefined

        this.email = params.email
        this.password = params.password
        this.isActive = params.isActive
        this.confirmCode = params.confirmCode || undefined
    }

    setPosts(posts: []){
        this.posts = posts
    }

    setComments(comments: []){
        this.comments = comments
    }

    setLikePost(likePosts: []){
        this.likePost = likePosts
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