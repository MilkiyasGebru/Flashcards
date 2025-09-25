import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/db.js";
import {v7 as uuid} from "uuid";


export class WordModel extends Model {}


WordModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: ()=>uuid()
        },
        user_id: {
            type: DataTypes.UUID,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        definition:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        bin: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        wrong_guesses: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        next_review_time: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        }
    },

    {
        sequelize,
        modelName: 'Word',
    },
);