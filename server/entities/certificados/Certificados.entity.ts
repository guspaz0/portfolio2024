import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aptitudes } from "../aptitudes/Aptitudes.entity";
import { Escuelas } from "../escuelas/Escuelas.entity";
import { Perfiles } from "../perfiles/Perfiles.entity";
import { Assets } from "~/server/types/contacto";

@Entity("certificados")
export class Certificados {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "nombre", length: 50 })
    nombre: string;

    @Column("varchar", { name: "image", nullable: true, length: 100 })
    image: string | null;

    @Column("datetime", { name: "fecha", nullable: true })
    fecha: Date | null;

    @ManyToOne(() => Escuelas, (escuelas) => escuelas.certificados)
    @JoinColumn({ name: "escuela_id" })
    escuela: Escuelas;

    @OneToMany(() => Perfiles, (perfil) => perfil.certificados)
    perfiles: Perfiles[];

    @ManyToMany(() => Aptitudes, (aptitud) => aptitud.certificados)
    aptitudes: Aptitudes[];

  @AfterLoad()
  setAssetUrl() {
    if (this.image) {
      this.image = Assets.CERT_URL+this.image;
    }
  }
}
