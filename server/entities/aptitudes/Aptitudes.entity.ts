import { Categoria } from '../categorias/Categorias.entity';
import { Certificado } from '../certificados/Certificados.entity';
import { Perfil } from '../../types/Perfil';
import { Proyecto } from '../proyectos/Proyectos.entity';
import { Assets } from "~/server/types/contacto";
import { Aptitudes, Certificados, Perfiles } from "@prisma/client";

export class Aptitud {
    id: number;
    nombre: string;
    imagen: string | null;
    icon: string | null;
    categoria?: Categoria;
    perfiles?: Perfil[];
    proyectos?: Proyecto[];
    certificados?: Certificado[];
    countCertificados?: number;
    countProyects?: number;

  constructor(a: Aptitudes) {
    const flatCertificados = a.certificados?.flatMap(c => new Certificado(c?.certificado)) || undefined;
    const flatProyectos = a.proyectos?.flatMap(p => new Proyecto(p?.proyecto)) || undefined
    this.id = a.id;
    this.nombre = a?.nombre;
    this.imagen = a.imagen? `${Assets.CLOUD_URL}${a.imagen}` : "";
    this.icon = a.icon || '' ;
    this.categoria = a.categoria || undefined;
    this.perfiles = a.perfiles?.flatMap(p => p?.perfil) || undefined;
    this.proyectos =  flatProyectos;
    this.certificados =  flatCertificados;
    this.countCertificados = flatCertificados?.length;
    this.countProyects = flatProyectos?.length;
  }
}