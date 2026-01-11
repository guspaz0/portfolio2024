import prisma from "~/lib/prisma";

class DashboardService {
    constructor(private repo = prisma){}

    async countAll(){
        return {
            aptitudes: await this.repo.aptitudes.count(),
            certificados: await this.repo.certificados.count(),
            experiencias: await this.repo.experiencias.count(),
            proyectos: await this.repo.proyectos.count(),
            escuelas: await this.repo.escuelas.count(),
        };
    }
}

export default new DashboardService();