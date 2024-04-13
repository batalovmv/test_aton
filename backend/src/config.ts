import { DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import dotenv from "dotenv";
import * as process from "process";
import { User } from "./entities/user.entity";
import { Client } from "./entities/client.entity";
import { UserFactory } from "./db/factories/user.factory";
import { ClientFactory } from "./db/factories/client.facroty";
import MainSeeder from "./db/seeds/main.seeder";

dotenv.config();

export const appDBConnect: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        User,
        Client
    ],
    seeds: [
        MainSeeder,
    ],
    factories: [
        UserFactory,
        ClientFactory
    ]
}