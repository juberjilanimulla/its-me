import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
// import { User } from "./auth/entities/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/**/*.entity.ts'],
    // entities:[User],
    migrations: ['src/migrations/*.ts'],
    synchronize: false
});
