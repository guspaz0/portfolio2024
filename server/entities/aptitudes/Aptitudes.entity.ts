import {
    AfterLoad,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categorias } from '../categorias/Categorias.entity';
import { Certificados } from '../certificados/Certificados.entity';
import { Perfiles } from '../perfiles/Perfiles.entity';
import { Proyectos } from '../proyectos/Proyectos.entity';
import { Assets } from "~/server/types/contacto";


@Entity("aptitudes")
export class Aptitudes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "nombre", length: 50 })
    nombre: string;

    @Column({ type: "varchar", name: "image", nullable: true, length: 100 })
    image: string | null;

    @ManyToOne(() => Categorias, (categorias) => categorias.aptitudes, {eager: false})
    @JoinColumn([{ name: "categoria_id", referencedColumnName: "id" }])
    categoria: Categorias;

    @OneToMany(() => Perfiles, (perfil) => perfil.aptitudes, {eager: false})
    perfiles: Perfiles[];

  @ManyToMany(() => Proyectos, (proyecto) => proyecto.aptitudes, {eager: false})
    @JoinTable({
        name: "proyectos_aptitudes",
        inverseJoinColumn: { name: "proyecto_id", referencedColumnName: "id" },
        joinColumn: { name: "aptitud_id", referencedColumnName: "id" }
    })
    proyectos: Proyectos[];

    @ManyToMany(() => Certificados,(certificados) => certificados.aptitudes, {eager: false})
    @JoinTable({
        name: "certificados_aptitudes",
        inverseJoinColumn: { name: "certificado_id", referencedColumnName: "id" },
        joinColumn: { name: "aptitud_id", referencedColumnName: "id" }
    })
    certificados: Certificados[];

    @AfterLoad()
    loadAssets(){
      this.image = this.image
        ? Assets.CLOUD_URL + this.image
        : '';
    }
}
