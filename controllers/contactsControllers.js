import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/httpError.js";
import handleIssues from "../decorators/issuesWrapper.js";

const getAllContacts = async (req, res) => {
    const {id} = req.user;
    const filter = {owner: id};

    const contacts = await contactsService.listContacts(filter);

    res.json(contacts);
};


const getOneContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.getContactById({id, owner})
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const createContact = async (req, res) => {
    const {id} = req.user;
    const contact = await contactsService.addContact({...req.body, owner: id});

    res.status(201).json(contact);
};

const updateContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.updateContact({id, owner}, req.body);
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};


const updateFavoriteStatus = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const {favorite} = req.body;
    const contact = await contactsService.updateStatusContact({id, owner}, {favorite});
    if (!contact) {
        throw HttpError(404);
    }

    res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.removeContact({id, owner});
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

export default {
    getAllContacts: handleIssues(getAllContacts),
    getOneContact: handleIssues(getOneContact),
    createContact: handleIssues(createContact),
    updateContact: handleIssues(updateContact),
    updateFavoriteStatus: handleIssues(updateFavoriteStatus),
    deleteContact: handleIssues(deleteContact),
}