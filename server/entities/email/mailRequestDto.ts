import { Exclude, Expose, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, Length, ValidateIf } from "class-validator";

@Expose()
export class MailRequestDto {
    @IsNotEmpty({ message: 'Asunto no debe estar vacio' })
    @Length(2, 20, { message: 'Asunto debe tener al menos 2 caracteres' })
    subject: string = ''

    @IsNotEmpty({ message: 'Mensaje no debe estar vacio'})
    @Length(20, 500, { message: 'Mensaje debe tener al menos 20 caracteres' })
    text: string = ''

    @IsOptional()
    @IsNotEmpty({ message: 'Correo Electronico no debe estar vacio' })
    @IsEmail({},{ message: 'Correo Electronico no es válido' })
    from?: string = '';

    @Exclude()
    @IsOptional()
    to: string = ''

    @Exclude()
    @IsOptional()
    @ValidateIf((object, value) => value != null && value.length > 0)
    @Type(()=> Object)
    attachment?: string

    @Exclude()
    @IsOptional()
    html?: string;
}