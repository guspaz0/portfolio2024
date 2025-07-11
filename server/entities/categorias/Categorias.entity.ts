import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aptitudes } from "../aptitudes/Aptitudes.entity";

@Entity("categorias")
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @OneToMany(() => Aptitudes, (aptitudes) => aptitudes.categoria)
  aptitudes: Aptitudes[];
}
