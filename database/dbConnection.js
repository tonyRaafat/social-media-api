import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()
const sequelize = new Sequelize(process.env.DB_URI)

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export { sequelize }