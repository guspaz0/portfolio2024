import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("eventos")
export class Eventos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo", length: 50 })
  titulo: string;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;
}
