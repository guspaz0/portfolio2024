import { IsArray, IsISO8601, IsNotEmpty, Validate } from "class-validator";
import { Certificado } from "./Certificados.entity";
import { Expose, Transform, Type } from "class-transformer";
import { toArrayOfNumbers } from "~/server/utils/validation.utils";

export type CertificadoForm = Pick<Certificado, 'nombre'> 
    & { id?: number, fecha: string, imagen: File | null, escuela: number, aptitudes: number[], perfiles: number[] }

@Expose()
export class CertificadoRequestDto implements CertificadoForm {

    id?: number | undefined;

    @IsNotEmpty()
    nombre: string = '';

    @IsNotEmpty()
    @IsISO8601()
    fecha: string = new Date().toISOString().split('T')[0];

    @IsNotEmpty()
    @Type(() => Object)
    @Transform(({ value, obj }) => obj.imagen)
    imagen: File | null = null;

    @IsNotEmpty()
    @Transform(({value}) => +value)
    escuela: number = 1;

    @IsArray()
    @IsNotEmpty()
    @Transform(toArrayOfNumbers)
    aptitudes: number[] = [];

    @IsArray()
    @IsNotEmpty()
    @Transform(toArrayOfNumbers)
    perfiles: number[] = [];
}
