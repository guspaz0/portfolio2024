import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExperienciasPerfil } from "./ExperienciasPerfil";
import { Perfiles } from "./Perfiles";

@Entity("experiencias")
export class Experiencias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;

  @Column("varchar", { name: "empresa", nullable: true, length: 50 })
  empresa: string | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 100 })
  imagen: string | null;

  @Column("datatime", { name: "fecha", nullable: true })
  fecha: NonNullable<unknown> | null;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @OneToMany(() => Perfiles,(perfil) => perfil.experiencias)
  perfiles: Perfiles[];
}
