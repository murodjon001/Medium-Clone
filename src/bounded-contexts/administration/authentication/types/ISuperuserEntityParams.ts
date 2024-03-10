export interface ISuperUserEntityParams{
    id?: string
    createdAt?: Date
    updatedAt?: Date

    email: string
    name?: string
    password: string
    confirmCode: string
}