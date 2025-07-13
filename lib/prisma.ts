import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  log: ['warn', 'error', 'query'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Disable auto schema creation/updates
  errorFormat: 'minimal'
})

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
