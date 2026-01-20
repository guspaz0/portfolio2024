import 'reflect-metadata';
import { IsNotEmpty, IsNumber, IsInstance, IsObject, IsOptional, ValidateIf } from "class-validator";
import { Aptitud } from "./Aptitudes.entity";
import { Exclude, Expose, Transform, Type } from "class-transformer";

export type AptitudForm = Pick<Aptitud, 'nombre'> & { imagen: File | null, categoria: number, id?: number, icon: string }

@Expose()
export class AptitudRequestDto implements AptitudForm {
    @IsNotEmpty()
    nombre: string = '';

    @IsOptional()
    @ValidateIf(({ value }) => value !== null || value !== '')
    icon: string = '';

    @IsNotEmpty()
    @Type(() => Object)
    @Transform(({ value, obj }) => obj.imagen)
    imagen: File | null = null;

    @IsNotEmpty()
    @Transform(({ value }) => +value)
    categoria: number = 1;

    @Exclude()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Transform(({ value }) => +value)
    nivel?: number;

    id?: number | undefined;
}