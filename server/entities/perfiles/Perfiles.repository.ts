import { Prisma } from '@prisma/client';
import prisma from '~/lib/prisma';
import { Experiencia } from '../experiencias/Experiencias.entity';
import { Aptitud } from '../aptitudes/Aptitudes.entity';
import { Certificado } from '../certificados/Certificados.entity';
import { Proyecto } from '../proyectos/Proyectos.entity';
import { Escuela } from '../escuelas/Escuelas.entity';
import { Perfil } from '~/server/types/Perfil';

const perfilRepo = Prisma.defineExtension((prisma) =>
    prisma.$extends({
        query: {
            perfiles: {
                async findMany({ model, operation, args, query }){
                    const perfiles = await query(args)
                    const result = perfiles.map(p => ({
                            ...p,
                            experiencias: p.experiencias?.flatMap(e => new Experiencia(e?.experiencia)) || undefined,
                            aptitudes: p.aptitudes?.flatMap(a => new Aptitud(a?.aptitud)) || undefined,
                            certificados: p.certificados?.flatMap(c => new Certificado(c?.certificado)) || undefined,
                            proyectos: p.proyectos?.flatMap(pr => new Proyecto(pr?.proyecto)) || undefined,
                            escuelas: p.escuelas?.flatMap(e => new Escuela(e?.escuela)) || undefined
                        })
                    )
                    return result as Perfil[]
                },
                async findUnique({ model, operation, args, query }) {
                    const p = await query(args)
                    return {
                        ...p,
                        experiencias: p.experiencias?.flatMap(e => new Experiencia(e?.experiencia)) || undefined,
                        aptitudes: p.aptitudes?.flatMap(a => new Aptitud(a?.aptitud)) || undefined,
                        certificados: p.certificados?.flatMap(c => new Certificado(c?.certificado)) || undefined,
                        proyectos: p.proyectos?.flatMap(pr => new Proyecto(pr?.proyecto)) || undefined,
                        escuelas: p.escuelas?.flatMap(e => new Escuela(e?.escuela)) || undefined
                    }
                }
            }
        }
    })
)

export default prisma.$extends(perfilRepo)