import { AfterLoad, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aptitudes } from "../aptitudes/Aptitudes.entity";
import { Perfiles } from "../perfiles/Perfiles.entity";
import { Assets } from "~/server/types/contacto";

@Entity("proyectos")
export class Proyectos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 100 })
  imagen: string | null;

  @Column("varchar", { name: "depositorio", nullable: true, length: 100 })
  depositorio: string | null;

  @Column("varchar", { name: "deploy", nullable: true, length: 100 })
  deploy: string | null;

  @ManyToMany(() => Aptitudes,(aptitud) => aptitud.proyectos, {eager: false})
  aptitudes: Aptitudes[];

  @OneToMany(() => Perfiles, (perfil) => perfil.proyectos, {eager: false})
  perfiles: Perfiles[];

  @AfterLoad()
  setAssetUrl() {
    this.imagen = this.imagen
      ? Assets.PROYECTO_URL+this.imagen
      : '';
  }
}
