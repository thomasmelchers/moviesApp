interface IUser {
    roles: {
        User: number
        Editor?: number
        Admin?: number
    }
    username: string
    email: string
    firstname: string
    lastname: string
    gender: string
    refreshToken: string
    _id: string
}

export default IUser
