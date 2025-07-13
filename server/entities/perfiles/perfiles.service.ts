import { Perfil } from "./Perfiles.entity";
import Prisma from '~/lib/prisma'

class PerfilesService {
  private repo = Prisma.perfiles;

  async findAll(): Promise<Perfil[] | undefined> {
    try {
      const perfiles = await this.repo.findMany({
        include: {
          experiencias: { select: { experiencia: true } },
          aptitudes: { select: { aptitud: true } },
          certificados: {
            include: {
              certificado: {
                include: {
                  aptitudes: {
                    include: {
                      aptitud: true
                    }
                  },
                  escuela: true
                }
              },
            }
          },
          proyectos: {
            select: {
              proyecto: {
                include: {
                  aptitudes: {
                    include: {
                      aptitud: true
                    }
                  }
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
      return perfiles.map(p => new Perfil(p));
    } catch (error) {
      console.error(error);
    } finally {
      await Prisma.$disconnect();
    }
  }

  async getPerfil(id: number): Promise<Perfil | undefined> {
    try {
      const perfil = await this.repo.findUniqueOrThrow({
        where: { id },
        include: {
          experiencias: { select: { experiencia: true } },
          aptitudes: { select: { aptitud: true } },
          certificados: {
            include: {
              certificado: {
                include: {
                  aptitudes: {
                    include: {
                      aptitud: true
                    }
                  },
                  escuela: true
                },
              }
            }
          },
          proyectos: {
            select: {
              proyecto: {
                include: {
                  aptitudes: {
                    select: {
                      aptitud: true
                    }
                  }
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
      return new Perfil(perfil)
    } catch (error) {
      console.error(error);
    } finally {
      await Prisma.$disconnect();
    }
  }
}

export default new PerfilesService();
