import { Aptitud } from "../aptitudes/Aptitudes.entity";
import { Categorias } from "@prisma/client";

export class Categoria {
  id: number;
  nombre: string;
  aptitudes?: Aptitud[];

  constructor(c: Categorias) {
    this.id = c.id;
    this.nombre = c.nombre;
    this.aptitudes = c.aptitudes?.map(a => new Aptitud(a?.aptitud)) || undefined;
  }
}
