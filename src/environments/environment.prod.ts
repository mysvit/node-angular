import {Environment} from "@shared/config/environment.js";

export const environment: Environment = {
  production: true,
  port: 3000,
  db: {
    host: 'production-db',
    database: 'serverdb',
    user: 'root',
    password: 'root',
    connectionLimit: 5
  }
}