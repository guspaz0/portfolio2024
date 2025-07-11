import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Certificados } from "../certificados/Certificados.entity";
import { Perfiles } from "../perfiles/Perfiles.entity";
import { Assets } from "~/server/types/contacto";

@Entity("escuelas")
export class Escuelas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "image", nullable: true, length: 100 })
  image: string | null;

  @OneToMany(() => Certificados, (certificados) => certificados.escuela)
  certificados: Certificados[];

  @OneToMany(() => Perfiles, (perfil) => perfil.escuelas)
  perfiles: Perfiles[];

  @AfterLoad()
  setAssetUrl() {
    if (this.image) {
      this.image = Assets.ESCUELA_URL + this.image;
    }
  }
}
