import { Injectable } from "@nestjs/common";
import { UsersSeeder } from "./users.seeder";
import { PermissionsSeeder } from "./permissions.seeder";
import { CatchErrors } from "../decorators/catch-errors.decorator";



@Injectable()
@CatchErrors()
export class SeederRunner{
    constructor(
        private readonly usersSeeder: UsersSeeder,
        private readonly permissionsSeeder: PermissionsSeeder,
    ){}


    async runSeeds() : Promise<void>{
        await this.permissionsSeeder.run();
        await this.usersSeeder.run();
    }


}