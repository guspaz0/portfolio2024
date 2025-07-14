import { Certificado } from "../certificados/Certificados.entity";
import { Perfil } from "../../types/Perfil";
import { Assets } from "~/server/types/contacto";
import { Escuelas } from "@prisma/client"

export class Escuela {
  id: number;
  nombre: string;
  imagen: string | null;
  certificados?: Certificado[];
  perfiles?: Perfil[];

  constructor(e: Escuelas) {
    this.id = e.id;
    this.nombre = e.nombre;
    this.imagen = e.imagen ? `${Assets.ESCUELA_URL}${e.imagen}` : '';
    this.certificados = e.certificados?.flatMap((c) => new Certificado(c?.certificado)) || undefined;
    this.perfiles = e.perfiles?.flatMap((p) => p?.perfil) || undefined;
  }
}
