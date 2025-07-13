import { Aptitud } from "../aptitudes/Aptitudes.entity";
import { Certificado } from "../certificados/Certificados.entity";
import { Escuela } from "../escuelas/Escuelas.entity";
import { Experiencia } from "../experiencias/Experiencias.entity";
import { Proyecto } from "../proyectos/Proyectos.entity";
import { Perfiles } from "@prisma/client"

export class Perfil {
  protected id: number;
  protected nombre: string;
  aptitudes: Aptitud[];
  certificados: Certificado[];
  escuelas: Escuela[];
  proyectos: Proyecto[];
  experiencias: Experiencia[];

  constructor(
    p: Perfiles
  ) {
    this.id = p.id;
    this.nombre = p.nombre;
    this.aptitudes = p.aptitudes?.flatMap(apt => new Aptitud(apt?.aptitud)) || [];
    this.certificados = p.certificados?.flatMap(cert => new Certificado(cert?.certificado)) || [];
    this.escuelas = p.escuelas?.flatMap(esc => new Escuela(esc?.escuela)) || [];
    this.proyectos = p.proyectos?.flatMap(pr => new Proyecto(pr?.proyecto)) || [];
    this.experiencias = p.experiencias?.flatMap(exp => new Experiencia(exp?.experiencia)) || [];
  }
}
