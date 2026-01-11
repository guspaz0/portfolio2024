import experiencias from "~/server/api/experiencias";
import { Perfil } from "../../types/Perfil";
import { Assets } from "../../types/contacto";
import { Experiencias } from "@prisma/client"

export class Experiencia {
  id: number;
  nombre: string;
  descripcion: string;
  empresa: string | null;
  imagen: string | null;
  fecha: Date | null;
  fechaFin: Date | string | null;
  perfiles?: Perfil[];
  duracion: Duracion;

  constructor(e: Experiencias) {
    this.id = e.id;
    this.nombre = e.nombre;
    this.descripcion = e.descripcion as string;
    this.empresa = e.empresa;
    this.imagen = e.imagen? Assets.EXP_URL+e.imagen : null;
    this.fecha = e.fecha ? new Date(e.fecha) : null;
    this.fechaFin = this.fechaFin
      ? new Date(this.fechaFin)
      : new Date();
    this.duracion = new Duracion(this.fecha as Date, this.fechaFin);
    this.perfiles = e.perfiles?.flatMap(p => p?.perfil) || undefined;
  }
}

class Duracion {
  #meses: number;
  #años: number;
  meses: number;
  años: number;

  constructor(fecha: Date, fechaFin: Date) {
    const fecha_f = new Date(fechaFin ? fechaFin : Date.now())
    this.#meses = ((fecha_f.getTime() - new Date(fecha).getTime()) / (1000 * 60 * 60 * 24 * 30))
    this.#años = 0;
    this.meses = this.initMeses();
    this.años = this.initAños();
  }
  private initAños() {
    return this.#meses >= 12
      ? Math.floor(this.#meses / 12)
      : 0;
  }
  private initMeses() {
    this.#años = this.#meses >= 12
      ? Math.floor(this.#meses / 12)
      : 0;
    return Math.floor(this.#meses - this.#años * 12)
  }
}
