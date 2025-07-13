import { Categoria } from '../categorias/Categorias.entity';
import { Certificado } from '../certificados/Certificados.entity';
import { Perfil } from '../perfiles/Perfiles.entity';
import { Proyecto } from '../proyectos/Proyectos.entity';
import { Assets } from "~/server/types/contacto";
import { Aptitudes, Perfiles } from "@prisma/client";

export class Aptitud {
    protected id: number;
    protected nombre: string;
    image: string | null;
    categoria?: Categoria;
    perfiles?: Perfil[];
    proyectos?: Proyecto[];
    certificados?: Certificado[];

  constructor(a: Aptitudes) {
    this.id = a.id;
    this.nombre = a?.nombre;
    this.image = a.image && Assets.CLOUD_URL + this.image;
    this.categoria = a.categoria || undefined;
    this.perfiles = a.perfiles?.flatMap(p => new Perfil(p?.perfil)) || undefined;
    this.proyectos = a.proyectos?.flatMap(p => new Proyecto(p?.proyecto)) || undefined;
    this.certificados = a.certificados?.flatMap(c => new Certificado(c?.certificado)) || undefined;
  }
}
