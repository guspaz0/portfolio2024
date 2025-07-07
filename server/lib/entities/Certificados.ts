import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Escuelas } from "./Escuelas";
import { Perfiles } from "./Perfiles";
import { Aptitudes } from "./Aptitudes";

@Entity("certificados")
export class Certificados {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("varchar", { name: "nombre", length: 50 })
    nombre: string;

    @Column("varchar", { name: "image", nullable: true, length: 100 })
    image: string | null;

    @Column("datetime", { name: "fecha", nullable: true })
    fecha: Date | null;

    @ManyToOne(() => Escuelas, (escuelas) => escuelas.certificados)
    @JoinColumn([{ name: "escuela_id", referencedColumnName: "id" }])
    escuela: Escuelas;

    @OneToMany(() => Perfiles, (perfil) => perfil.certificados)
    perfiles: Perfiles[];

    @OneToMany(() => Aptitudes, (aptitud) => aptitud.certificados)
    aptitudes: Aptitudes[];
}
