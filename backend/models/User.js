import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/db.js";
import {v7 as uuid} from "uuid";
import {WordModel} from "./Word.js";


export class UserModel extends Model {}


UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: ()=>uuid()
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);

UserModel.hasMany(WordModel, {foreignKey: 'user_id'});
WordModel.belongsTo(UserModel, {foreignKey: 'user_id'})