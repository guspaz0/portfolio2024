import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Certificados } from "./Certificados";
import { PerfilesEscuelas } from "./PerfilesEscuelas";
import { Perfiles } from "./Perfiles";

@Entity("escuelas")
export class Escuelas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "image", nullable: true, length: 100 })
  image: string | null;

  @OneToMany(() => Certificados, (certificados) => certificados.escuela)
  certificados: Certificados[];

  @OneToMany(() => Perfiles, (perfil) => perfil.escuelas)
  perfiles: Perfiles[];
}
