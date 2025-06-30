import * as authServices from "../services/authServices.js";
import handleIssues from "../decorators/issuesWrapper.js";

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

export default {
    register: handleIssues(register),
    login: handleIssues(login),
    logout: handleIssues(logout),
    getCurrent: handleIssues(getCurrent),
    updateSubscription: handleIssues(updateSubscription),
};