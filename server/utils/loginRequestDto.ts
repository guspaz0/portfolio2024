import { Expose } from "class-transformer";
import { IsEmail, IsEmpty, isEmpty, IsNotEmpty, Length } from "class-validator";

@Expose()
export class LoginRequestDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}