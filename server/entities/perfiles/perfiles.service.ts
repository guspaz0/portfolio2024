import { Perfil } from "../../types/Perfil";
import { Perfiles } from "@prisma/client"
import PerfilesRepository from "./Perfiles.repository";

class PerfilesService {
  private repo = PerfilesRepository.perfiles;

  async findAll(): Promise<Perfiles[] | undefined> {
    try {
      const perfiles = await this.repo.findMany({
        include: {
          experiencias: { select: { experiencia: true } },
          aptitudes: { 
            select: { 
              aptitud: { 
                include: { 
                  certificados: { include: { certificado: true } },
                  proyectos: { include: { proyecto: true } }
                } 
              } 
            } 
          },
          certificados: {
            include: {
              certificado: {
                include: {
                  aptitudes: { include: { aptitud: true } },
                  escuela: true
                }
              },
            }
          },
          proyectos: {
            select: {
              proyecto: {
                include: {
                  aptitudes: { include: { aptitud: true } }
                }
              },
            }
          },
          escuelas: {
            include: {
              escuela: true
            }
          }
        },
      })
      return perfiles
    } catch (error) {
      console.error(error);
    } finally {
      await PerfilesRepository.$disconnect();
    }
  }

  async getPerfil(id: number): Promise<Perfiles | undefined | null> {
    try {
      const perfil = await this.repo.findUnique({
        where: { id },
        include: {
          experiencias: { include: { experiencia: true } },
          aptitudes: { 
            include: { 
              aptitud: { 
                include: { 
                  certificados: { include: { certificado: true } },
                  proyectos: { include: { proyecto: true } }
                } 
              } 
            } 
          },
          certificados: {
            include: {
              certificado: {
                include: {
                  aptitudes: { include: { aptitud: true } },
                  escuela: true
                }
              },
            }
          },
          proyectos: {
            include: {
              proyecto: {
                include: {
                  aptitudes: { include: { aptitud: true } }
                }
              },
            }
          },
          escuelas: {
            include: {
              escuela: true
            }
          }
        },
      });
      return perfil
    } catch (error) {
      console.error(error);
    } finally {
      await PerfilesRepository.$disconnect();
    }
  }
}

export default new PerfilesService();
