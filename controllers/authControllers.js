import * as authServices from "../services/authServices.js";
import handleIssues from "../decorators/issuesWrapper.js";
import {resolve, join} from "node:path";
import {rename, unlink} from "node:fs/promises";
import HttpError from "../helpers/httpError.js";

const postersDir = resolve("public", "avatars");

const register = async (req, res) => {
    const user = await authServices.registerUser(req.body);
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { token, user } = await authServices.loginUser(req.body);
    res.json({ token, user });
};

const logout = async (req, res) => {
    await authServices.logoutUser(req.user);
    res.sendStatus(204);
};

const getCurrent = async (req, res) => {
    res.json(req.user.toPublicJSON());
};

const updateSubscription = async (req, res) => {
    const { id } = req.user;
    const { subscription } = req.body;

    const updatedUser = await authServices.updateSubscription(id, subscription);
    res.json(updatedUser);
};

export const updateAvatar = async (req, res) => {
    const {id} = req.user;
    console.log("🧾 req.file:", req.file);
    console.log("🧾 req.body:", req.body);

    if (!req.file) {
        throw HttpError(404, "No file uploaded");
    }
    try {
        let avatarURL;

        const {path: oldPath, filename} = req.file;
        const newPath = join(postersDir, filename);
        await rename(oldPath, newPath);
        avatarURL = join("avatars", filename);

        await authServices.updateAvatar(id, avatarURL);

        res.json({avatarURL});
    } catch (error) {
        await unlink(oldPath);
        throw HttpError(500);
    }
};

export default {
    register: handleIssues(register),
    login: handleIssues(login),
    logout: handleIssues(logout),
    getCurrent: handleIssues(getCurrent),
    updateSubscription: handleIssues(updateSubscription),
    updateAvatar: handleIssues(updateAvatar),
};