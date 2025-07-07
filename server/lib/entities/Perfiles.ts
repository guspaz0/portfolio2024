import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AptitudesPerfil } from "./AptitudesPerfil";
import { Certificados } from "./Certificados";
import { Escuelas } from "./Escuelas";
import { Proyectos } from "./Proyectos";
import { Experiencias } from "./Experiencias";
import { Aptitudes } from "./Aptitudes";

@Entity("perfiles")
export class Perfiles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @OneToMany(() => Aptitudes, (aptitud) => aptitud.perfiles)
  @JoinTable({
      name: "aptitudes_perfil",
      inverseJoinColumn: { name: "aptitud_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  aptitudes: Aptitudes[];

  @OneToMany(() => Certificados, (certificado) => certificado.perfiles)
  @JoinTable({
      name: "certificados_perfil",
      inverseJoinColumn: { name: "certificado_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  certificados: Certificados[];

  @OneToMany(() => Escuelas, (escuela) => escuela.perfiles)
  @JoinTable({
      name: "perfiles_escuelas",
      inverseJoinColumn: { name: "escuela_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  escuelas: Escuelas[];

  @OneToMany(() => Proyectos, (proyecto) => proyecto.perfiles)
  @JoinTable({
      name: "proyectos_perfil",
      inverseJoinColumn: { name: "proyectos_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  proyectos: Proyectos[];

  @OneToMany(() => Experiencias, (experiencia) => experiencia.perfiles)
  @JoinTable({
      name: "experiencias_perfil",
      inverseJoinColumn: { name: "experiencia_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  experiencias: Experiencias[];
}
