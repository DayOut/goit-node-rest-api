import Contact from "../models/Contact.js";

// Отримати всі контакти
export const listContacts = async () => await Contact.findAll();

// Отримати контакт за ID
export const getContactById = async (contactId) => {
    const contact = await Contact.findByPk(contactId);
    return contact || null;
};

// Додати новий контакт
export const addContact = async (data) => {
    return Contact.create(data);
};

// Видалити контакт
export const removeContact = async (contactId) => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    await contact.destroy();
    return contact;
};

export const updateContact = async (contactId, data) => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    await contact.update(data);
    return contact;
}