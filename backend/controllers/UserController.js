import {UserModel} from "../models/User.js";
import {create_jwtoken} from "../utils/GenerateJWToken.js";
import bcrypt from "bcrypt";
import logger from "../utils/Logger.js";


export const register_user = async (req, res) => {

    try{
        const {username, password} = req.body;

        if (!username || !password) {
            logger.error('User registration failed: Missing username or password.', { ip: req.ip });
            return res.status(400).json({error: "Username and password are required"});
        }

        const exists = await UserModel.findOne({
            where:{
                username: username,
            }
        })

        if(exists){
            logger.error('User registration failed: Username already exists.', { username });
            return res.status(400).json({error: "Username already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        const user = await UserModel.create({username: username, password: hashed_password});
        const token = await create_jwtoken(user.id, user.username)


        logger.info('New user registered successfully.', { user_id: user.id, username: user.username });

        return res.status(200).json({token: token, username: user.username});

    } catch (error){
        logger.error('Failed to register new user.', { message: error.message, stack: error.stack, username: req.body.username });

        return res.status(500).json({error: "Internal Server Error"});
    }
}

export const login_user = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            logger.warn('User login failed: Missing username or password.', { ip: req.ip });
            return res.status(400).json({error: "Username and password are required"});
        }
        const user = await UserModel.findOne({
            where:{
                username: username,
            }
        })

        if (!user){
            logger.error('User login failed: Username does not exist.', { username });

            return res.status(400).json({error: "User without username does not exist"});
        }
        const is_valid_password = await bcrypt.compare(password, user.password);

        if (!is_valid_password) {
            logger.error('User login failed: Incorrect password.', { username, password });

            return res.status(400).json({error: "Wrong Password"});
        }
        const token = await create_jwtoken(user.id, user.username)
        return res.status(200).json({token: token, username: user.username},)


    } catch (error) {
        logger.error('Failed to login a user.', { message: error.message, stack: error.stack, username: req.body.username });
        return res.status(500).json({error: "Internal Server Error"});
    }
}