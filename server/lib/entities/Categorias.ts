import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aptitudes } from "./Aptitudes";

@Entity("categorias")
export class Categorias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @OneToMany(() => Aptitudes, (aptitudes) => aptitudes.categoria)
  aptitudes: Aptitudes[];
}
