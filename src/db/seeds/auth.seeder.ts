import {DataSource} from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension';
import {AuthEntity} from "../../entities/auth.entity";

export default class AuthSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const user = factoryManager.get(AuthEntity);
        await user.saveMany(5);
    }
}