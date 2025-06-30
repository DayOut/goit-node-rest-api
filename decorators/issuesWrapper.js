import {UniqueConstraintError, ValidationError} from "sequelize";

const handleIssues = ctrl => {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            if (error instanceof ValidationError) {
                error.status = 400
            }

            if (error instanceof UniqueConstraintError) {
                error.status = 409;
            }
            next(error);
        }
    };
}

export default handleIssues;