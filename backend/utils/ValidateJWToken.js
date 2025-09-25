import jwt from 'jsonwebtoken';
import {ENV_VARS} from "../config/env_var.js";
export const verify_jwtoken = async (token)=>{
    return jwt.verify(token, ENV_VARS.JWT_SECRET);
}