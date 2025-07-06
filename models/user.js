import sequelize from "../db/dbConnection.js";
import {DataTypes, Model} from "sequelize";

class User extends Model {
    toPublicJSON() {
        return {
            email: this.email,
            subscription: this.subscription,
        };
    }
}

User.init(
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            unique: {
                args: true,
                msg: "Email in use",
            },
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter",
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: DataTypes.STRING,
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "users",
    }
);

export default User;