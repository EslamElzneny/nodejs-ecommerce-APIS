import { _PermissionsSeeder } from "./permissions.seeder.js"

class BaseSeeder {
    seedFlagIndex;
    constructor(){
        // Get all the command-line arguments
        const args = process.argv.slice(2);
        // Find the 'seed' argument if it exists
        this.seedFlagIndex = args.indexOf('seed');

    }

    run = () => {
        if (this.seedFlagIndex == -1) return
        _PermissionsSeeder.call();
        
    }

}

export const _BaseSeeder = new BaseSeeder;
