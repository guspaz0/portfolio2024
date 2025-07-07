import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: '../data/portfolio_db_sql',
    synchronize: false, // Set to false in production
    logging: false,
    entities: ['server/lib/entities/*.ts'],
    migrations: ['server/migrations/*.ts']
})