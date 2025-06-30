import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(HttpError(401, "Authorization header missing"));
        }

        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return next(HttpError(401, "Invalid authorization format"));
        }

        const { payload, error } = verifyToken(token);
        if (error) {
            return next(HttpError(401, "Invalid or expired token"));
        }

        const user = await findUser({ id: payload.id });
        if (!user || user.token !== token) {
            return next(HttpError(401, "Not authorized"));
        }

        req.user = user;
        next();
    } catch (err) {
        next(HttpError(500, "Internal authentication error"));
    }
};

export default authenticate;