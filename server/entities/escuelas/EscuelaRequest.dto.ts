import { Expose, Type, Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Escuela } from "./Escuelas.entity";

export type EscuelaForm = Pick<Escuela, 'nombre'> & { id?: number, imagen: File | null }

@Expose()
export class EscuelaRequestDto implements EscuelaForm {
    id?: number | undefined;
    
    @IsNotEmpty()
    nombre: string = '';
    
    @IsNotEmpty()
    @Type(() => Object)
    @Transform(({ value, obj }) => obj.imagen)
    imagen: File | null;
}