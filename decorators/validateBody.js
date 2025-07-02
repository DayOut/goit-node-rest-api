import HttpError from "../helpers/httpError.js";

const validateBody = (schema) =>
    (req, _, next) => {
        const {error} = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    };

export default validateBody;
