import jwt from 'jsonwebtoken';
import {ENV_VARS} from "../config/env_var.js";

export const create_jwtoken = async (id, username)=>{
    return jwt.sign({id, username}, ENV_VARS.JWT_SECRET, {expiresIn: '1d'});
}