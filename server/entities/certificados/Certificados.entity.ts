import { Aptitud } from "../aptitudes/Aptitudes.entity";
import { Escuela } from "../escuelas/Escuelas.entity";
import { Perfil } from "../perfiles/Perfiles.entity";
import { Assets } from "~/server/types/contacto";
import { Certificados } from "@prisma/client"

export class Certificado {
    protected id: number;
    protected nombre: string;
    image: string | null;
    fecha: Date | null;
    escuela?: Escuela;
    perfiles?: Perfil[];
    aptitudes?: Aptitud[];

  constructor(c: Certificados) {
    this.id = c.id;
    this.nombre = c.nombre;
    this.image = c.image ? `${Assets.CERT_URL}${c.image}` : '';
    this.fecha = c.fecha;
    this.escuela = c.escuela ? new Escuela(c.escuela) : '';
    this.perfiles = c.perfiles?.flatMap(p => new Perfil(p?.perfil)) || undefined;
    this.aptitudes = c.aptitudes?.flatMap(a => new Aptitud(a?.aptitud)) || undefined;
  }
}
