import {Sequelize} from "sequelize";
import {ENV_VARS} from "./env_var.js";

export const sequelize = new Sequelize(ENV_VARS.DATABASE_NAME, ENV_VARS.DATABASE_USERNAME, ENV_VARS.DATABASE_PASSWORD, {
    host: ENV_VARS.DATABASE_HOST,
    dialect: "postgres",
} )

export const connectToDataBase = async ()=>{
     await sequelize.authenticate();
     return sequelize.sync();
}

