import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aptitudes } from "../aptitudes/Aptitudes.entity";
import { Certificados } from "../certificados/Certificados.entity";
import { Escuelas } from "../escuelas/Escuelas.entity";
import { Experiencias } from "../experiencias/Experiencias.entity";
import { Proyectos } from "../proyectos/Proyectos.entity";


@Entity("perfiles")
export class Perfiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @ManyToMany(() => Aptitudes, (aptitud) => aptitud.perfiles)
  @JoinTable({
      name: "aptitudes_perfil",
      inverseJoinColumn: { name: "aptitud_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  aptitudes: Aptitudes[];

  @ManyToMany(() => Certificados, (certificado) => certificado.perfiles)
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

  @ManyToMany(() => Proyectos, (proyecto) => proyecto.perfiles)
  @JoinTable({
      name: "proyectos_perfil",
      inverseJoinColumn: { name: "proyecto_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  proyectos: Proyectos[];

  @ManyToMany(() => Experiencias, (experiencia) => experiencia.perfiles)
  @JoinTable({
      name: "experiencias_perfil",
      inverseJoinColumn: { name: "experiencia_id", referencedColumnName: "id" },
      joinColumn: { name: "perfil_id", referencedColumnName: "id" }
  })
  experiencias: Experiencias[];
}
