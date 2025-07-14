import { Aptitud } from "../entities/aptitudes/Aptitudes.entity";
import { Certificado } from "../entities/certificados/Certificados.entity";
import { Escuela } from "../entities/escuelas/Escuelas.entity";
import { Experiencia } from "../entities/experiencias/Experiencias.entity";
import { Proyecto } from "../entities/proyectos/Proyectos.entity";
import { Perfiles } from "@prisma/client"

export type Perfil = {
  id: number;
  nombre: string;
  aptitudes?: Aptitud[];
  certificados?: Certificado[];
  escuelas?: Escuela[];
  proyectos?: Proyecto[];
  experiencias?: Experiencia[];
}
