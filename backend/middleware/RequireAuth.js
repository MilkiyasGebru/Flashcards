import {verify_jwtoken} from "../utils/ValidateJWToken.js";

export const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "Authorization required"});
    }
    try {
        const token = authorization.split(" ")[1];
        const {id} = await verify_jwtoken(token);
        req.user_id = id;
        next();
    } catch (error){
        return res.status(401).json({error: error});
    }

}