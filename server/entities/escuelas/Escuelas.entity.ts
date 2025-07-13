import { Certificado } from "../certificados/Certificados.entity";
import { Perfil } from "../perfiles/Perfiles.entity";
import { Assets } from "~/server/types/contacto";
import { Escuelas } from "@prisma/client"

export class Escuela {
  id: number;
  nombre: string;
  image: string | null;
  certificados?: Certificado[];
  perfiles?: Perfil[];

  constructor(e: Escuelas) {
    this.id = e.id;
    this.nombre = e.nombre;
    this.image = e.image ? `${Assets.ESCUELA_URL}${e.image}` : '';
    this.certificados = e.certificados?.flatMap((c) => new Certificado(c?.certificado)) || undefined;
    this.perfiles = e.perfiles?.flatMap((p) => new Perfil(p?.perfil)) || undefined;
  }
}
