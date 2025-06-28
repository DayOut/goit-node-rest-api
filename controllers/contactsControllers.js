import * as contactsService from "../services/contactsServices.js";
import {createContactSchema, updateContactSchema, updateFavoriteSchema} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
};


export const getOneContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.getContactById(id)
        if (!result) return null;

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.removeContact(id);
        if (!result) return null;

        res.json(result);

    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
        try {
            const {error} = createContactSchema.validate(req.body);
            if (error) return null;
            const result = await contactsService.addContact(req.body);

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
;

export const updateContact = async (req, res, next) => {
    try {
        const {error} = updateContactSchema.validate(req.body);
        if (error) return null;

        const {id} = req.params;
        const result = await contactsService.updateContact(id, req.body);
        if (!result) return null;

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateFavoriteStatus = async (req, res) => {
    const {error} = updateFavoriteSchema.validate(req.body);
    if (error) return null;

    const {id} = req.params;
    const {favorite} = req.body;
    const result = await contactsService.updateContact(id, {favorite});
    if (!result) return null;

    res.status(200).json(result);
};