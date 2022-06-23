import {Environment} from '@shared/shared.js';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
    production: false,
    port: 3000,
    db: {
        host: 'server-db',
        database: 'serverdb',
        user: 'root',
        password: 'root',
        connectionLimit: 5
    }
}
