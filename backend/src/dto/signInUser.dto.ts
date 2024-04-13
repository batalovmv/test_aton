import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SignInUserDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    login!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password!: string;
}