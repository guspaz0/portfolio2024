import { Aptitud } from "../aptitudes/Aptitudes.entity";
import { Escuela } from "../escuelas/Escuelas.entity";
import { Perfil } from "../../types/Perfil";
import { Assets } from "~/server/types/contacto";
import { Certificados } from "@prisma/client"

export class Certificado {
    id: number;
    nombre: string;
    imagen: string | null;
    fecha: Date | null;
    escuela?: Escuela;
    perfiles?: Perfil[];
    aptitudes?: Aptitud[];

  constructor(c: Certificados) {
    this.id = c.id;
    this.nombre = c.nombre;
    this.imagen = c.imagen ? Assets.CERT_URL+c.imagen : '';
    this.fecha = c.fecha;
    this.escuela = c.escuela ? new Escuela(c.escuela) : '';
    this.perfiles = c.perfiles?.flatMap(p => p?.perfil) || undefined;
    this.aptitudes = c.aptitudes?.flatMap(a => new Aptitud(a?.aptitud)) || undefined;
  }
}
