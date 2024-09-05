export interface ICreateUserDto {
    username: string
    password: string
    email: string
    permissionLevel?: number
}