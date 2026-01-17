import type { Proyecto } from "~/server/entities/proyectos/Proyectos.entity";
import { IsArray, IsISO8601, IsNotEmpty } from 'class-validator'
import { Expose, Transform, Type } from "class-transformer";
import { toArrayOfNumbers } from "~/server/utils/validation.utils";

export type ProyectoForm = Omit<Proyecto, 'fecha' | 'aptitudes' | 'id' | 'imagen' | 'perfiles' > 
	& { fecha: string, aptitudes: number[], perfiles: number[], id?: number, imagen: File | null}

@Expose()
export class ProyectoRequestDto implements ProyectoForm {
    id?: number | undefined;
    
    @IsNotEmpty()
    nombre: string = '';
    
    @IsNotEmpty()
    descripcion: string = '';
    
    repositorio: string | null = '';
    
    deploy: string | null = '';
    
    @IsNotEmpty()
    @IsISO8601()
    fecha: string = new Date().toISOString().split('T')[0];
    
    @IsArray()
    @IsNotEmpty()
    @Transform(toArrayOfNumbers)
    aptitudes: number[] = [];
    
    @IsArray()
    @IsNotEmpty()
    @Transform(toArrayOfNumbers)
    perfiles: number[] = [];
    
    @IsNotEmpty()
    @Type(() => Object)
    @Transform(({ value, obj }) => obj.imagen)
    imagen: File | null;
}