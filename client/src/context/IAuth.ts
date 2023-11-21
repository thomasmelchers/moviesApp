export interface IAuth {
  username: string
  roles: {
    user: number
    editor?: number
    admin?: number
  }
  accessToken: string
}
