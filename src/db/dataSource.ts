import {DataSource, DataSourceOptions} from "typeorm";
import {SeederOptions} from 'typeorm-extension'
import {config} from "../config";
import {AuthEntity} from "../entities/auth.entity";
import AuthSeeder from "../db/seeds/auth.seeder";
import {AuthFactory} from "../db/factories/auth.factory";

const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: config.host,
    username: config.postgresUser,
    password: config.postgresPassword,
    database: config.postgresDatabase,
    port: 5432,
    // synchronize: true,
    logging: true,
    entities: [
        AuthEntity
    ],
    seeds: [
        AuthSeeder
    ],
    factories: [
        AuthFactory
    ],
};
export const appDataSource = new DataSource(dataSourceOptions);