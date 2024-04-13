
export interface IUserWithoutPass {
    id: number;
    fullName: string;
    login: string;
}
export interface IUser extends Required<IUserWithoutPass> {
    password: string;
}