import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

@Expose()
export class LoginRequestDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}