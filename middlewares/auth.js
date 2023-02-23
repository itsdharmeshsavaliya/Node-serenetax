import CustomErrorHandler from '../services/CustomErrorHandler';
import JwtService from '../services/JwtService';
import { User } from "../models";

const auth = async(req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) return next(CustomErrorHandler.unAuthorized());

    const token = authHeader.split(' ')[1];
    try {
        const { user_id } = await JwtService.verify(token);

        let isUserExist = await User.isUserExist(user_id);
        if (!isUserExist) return next(CustomErrorHandler.unAuthorized("User not found!"));

        const user = {
            user_id,
        }
        req.user = user;
        next();
    } catch (err) {
        return next(CustomErrorHandler.unAuthorized());
    }
}
export default auth;