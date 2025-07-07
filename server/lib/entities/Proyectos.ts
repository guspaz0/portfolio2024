import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aptitudes } from "./Aptitudes";
import { Perfiles } from "./Perfiles";

@Entity("proyectos")
export class Proyectos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
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

  @OneToMany(() => Aptitudes,(aptitud) => aptitud.proyectos)
  aptitudes: Aptitudes[];

  @OneToMany(() => Perfiles, (perfil) => perfil.proyectos)
  perfiles: Perfiles[];
}
