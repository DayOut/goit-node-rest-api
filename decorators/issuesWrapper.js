import {UniqueConstraintError, ValidationError} from "sequelize";
const {NODE_ENV} = process.env;

const handleIssues = ctrl =>
    async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            if (error instanceof ValidationError) {
                error.status = 400
            }

            if (error instanceof UniqueConstraintError) {
                error.status = 409;
            }

            const status = error.status || 500;
            res.status(status).json({
                status: "error",
                code: status,
                message: error.message,
                ...(NODE_ENV === 'development' && { stack: error.stack })
            });
        }
    }

export default handleIssues;