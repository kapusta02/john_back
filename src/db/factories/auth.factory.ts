import {Faker} from '@faker-js/faker';
import {setSeederFactory} from 'typeorm-extension';
import {AuthEntity} from "../../entities/auth.entity";

export const AuthFactory = setSeederFactory(AuthEntity, (faker: Faker) => {
    const user = new AuthEntity();
    user.email = faker.internet.email();
    user.password = '123123';
    user.refreshToken = user.generateRefreshToken();
    return user;
});