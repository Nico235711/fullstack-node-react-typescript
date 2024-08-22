import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.SUPABASE_DB, process.env.SUPABASE_DB_USERNAME, process.env.SUPABASE_DB_PASSWORD, {
    host: process.env.SUPABASE_HOST,
    dialect: "postgres",
    models: [__dirname + "/../models/**/*.ts"]
  }
)

export default db