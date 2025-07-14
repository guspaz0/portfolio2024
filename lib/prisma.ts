import { PrismaClient } from '@prisma/client'
import { AssetURL } from '../server/types/contacto'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      async $allOperations({ model, operation, args, query }) {
        const result = await query(args);
        const excludedOps = ['create','update','delete']
        const includedOpts = ['findFirst','findUnique','findUniqueOrThrow','findFirstOrThrow']
        if (includedOpts.includes(operation)) {
          switch(model) {
            case 'proyectos':
              result.repositorio = result.repositorio
                ? AssetURL.github+result.repositorio
                : null;
            case 'experiencias':
            case 'aptitudes':
            case 'escuelas':
            case 'certificados':
              // Handle User model operations
              result.imagen = result.imagen
                ? AssetURL[model]+result.imagen
                : '';
              break;
            default:
              // Handle default case
              break;
          }
        }

        return result
      }
    }
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
