import {runSeeders} from "typeorm-extension";
import {appDataSource} from "./dataSource";

appDataSource.initialize().then(async () => {
    await appDataSource.synchronize(true)
    await runSeeders(appDataSource);
    process.exit();
})