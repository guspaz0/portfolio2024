import { Categoria } from '../categorias/Categorias.entity';
import { Certificado } from '../certificados/Certificados.entity';
import { Perfil } from '../../types/Perfil';
import { Proyecto } from '../proyectos/Proyectos.entity';
import { Assets } from "~/server/types/contacto";
import { Aptitudes, Perfiles } from "@prisma/client";

export class Aptitud {
    protected id: number;
    protected nombre: string;
    imagen: string | null;
    categoria?: Categoria;
    perfiles?: Perfil[];
    proyectos?: Proyecto[];
    certificados?: Certificado[];

  constructor(a: Aptitudes) {
    this.id = a.id;
    this.nombre = a?.nombre;
    this.imagen = a.imagen? `${Assets.CLOUD_URL}${a.imagen}` : "";
    this.categoria = a.categoria || undefined;
    this.perfiles = a.perfiles?.flatMap(p => p?.perfil) || undefined;
    this.proyectos = a.proyectos?.flatMap(p => new Proyecto(p?.proyecto)) || undefined;
    this.certificados = a.certificados?.flatMap(c => new Certificado(c?.certificado)) || undefined;
  }
}
