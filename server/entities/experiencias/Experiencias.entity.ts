import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Perfiles } from "../perfiles/Perfiles.entity";
import { Assets } from "../../types/contacto";
import { AfterLoad } from "typeorm/browser";

@Entity("experiencias")
export class Experiencias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;

  @Column("varchar", { name: "empresa", nullable: true, length: 50 })
  empresa: string | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 100 })
  imagen: string | null;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | string |null;

  @OneToMany(() => Perfiles,(perfil) => perfil.experiencias)
  perfiles: Perfiles[];

  duracion: Duracion;

  @AfterLoad()
  async loadAssets(): Promise<void> {
    this.imagen =  this.imagen
      ? Assets.EXP_URL+this.imagen
      : '';
    this.fechaFin = this.fechaFin
      ? new Date(this.fechaFin).toString()
      : new Date().toString();
    this.duracion = new Duracion(this.fecha as Date,this.fechaFin);
  }
}

class Duracion {
  #meses: number;
  #años: number;
  meses: number;
  años: number;

  constructor(fecha: Date,fechaFin: string) {
    const fecha_f = new Date(fechaFin? fechaFin : Date.now())
    this.#meses = ((fecha_f.getTime()-new Date(fecha).getTime())/(1000*60*60*24*30))
    this.#años = 0;
    this.meses = this.initMeses();
    this.años = this.initAños();
  }
  private initAños(){
    return this.#meses >= 12
    ? Math.floor(this.#meses/12)
    : 0;
  }
  private initMeses(){
    this.#años = this.#meses >= 12
        ? Math.floor(this.#meses/12)
        : 0;
    return Math.floor(this.#meses-this.#años*12)
  }
}
