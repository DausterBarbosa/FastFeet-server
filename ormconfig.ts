import "dotenv/config";

export default {
   "type": "postgres",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_NAME,
   "entities": [
      "./src/app/entity/**/*.ts"
   ],
   "migrations": [
      "./src/database/migration/**/*.ts"
   ],
   "subscribers": [
      "./src/database/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "./src/app/entity",
      "migrationsDir": "./src/database/migration",
      "subscribersDir": "./src/database/subscriber"
   }
}