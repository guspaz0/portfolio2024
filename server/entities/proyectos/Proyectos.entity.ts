import { Aptitud } from "../aptitudes/Aptitudes.entity";
import { Perfil } from "../perfiles/Perfiles.entity";
import { Assets } from "~/server/types/contacto";
import { Proyectos } from "@prisma/client"

export class Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: Date | null;
  imagen: string | null;
  repositorio: string | null;
  deploy: string | null;
  aptitudes?: Aptitud[];
  perfiles?: Perfil[];

  constructor(p: Proyectos) {
    this.id = p.id;
    this.nombre = p.nombre;
    this.descripcion = p.descripcion;;
    this.fecha = p.fecha;
    this.imagen = Assets.PROYECTO_URL + p.imagen;
    this.repositorio = p.repositorio;
    this.deploy = p.deploy;
    this.aptitudes = p.aptitudes?.flatMap(a => new Aptitud(a?.aptitud)) || undefined;
    this.perfiles = p.perfiles?.flatMap(p => new Perfil(p?.perfil)) || undefined;
  }

}
