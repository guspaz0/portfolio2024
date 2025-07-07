import 'reflect-metadata'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categorias } from "./Categorias";
import { Proyectos } from './Proyectos';
import { Perfiles } from './Perfiles';
import { Certificados } from './Certificados';

@Entity("aptitudes")
export class Aptitudes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "nombre", length: 50 })
    nombre: string;

    @Column({ type: "varchar", name: "image", nullable: true, length: 100 })
    image: string | null;

    @ManyToOne(() => Categorias, (categorias) => categorias.aptitudes)
    @JoinColumn([{ name: "categoria_id", referencedColumnName: "id" }])
    categoria: Categorias;

    @OneToMany(() => Perfiles, (perfil) => perfil.aptitudes)
    perfiles: Perfiles[];

    @ManyToMany(()=> Proyectos, (proyecto) => proyecto.aptitudes, { cascade: true })
    @JoinTable({
        name: "proyectos_aptitudes",
        inverseJoinColumn: { name: "proyecto_id", referencedColumnName: "id" },
        joinColumn: { name: "aptitud_id", referencedColumnName: "id" }
    })
    proyectos: Proyectos[];

    @OneToMany(() => Certificados,(certificados) => certificados.aptitudes)
    @JoinTable({
        name: "certificados_aptitudes",
        inverseJoinColumn: { name: "certificado_id", referencedColumnName: "id" },
        joinColumn: { name: "aptitud_id", referencedColumnName: "id" }
    })
    certificados: Certificados[];
}
