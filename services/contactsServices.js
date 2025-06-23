import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

// Шлях до JSON-файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.resolve("db", "contacts.json");

// Утиліта для зчитування файлу
const readContactsFile = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("[Read Error]:", error.message);
        return [];
    }
};

// Утиліта для запису у файл
const writeContactsFile = async (contacts) => {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error("[Write Error]:", error.message);
    }
};

// Отримати всі контакти
export const listContacts = async () => await readContactsFile();

// Отримати контакт за ID
export const getContactById = async (contactId) => {
    const contacts = await readContactsFile();
    return contacts.find((c) => c.id === contactId) || null;
};

// Додати новий контакт
export const addContact = async (name, email, phone) => {
    const contacts = await readContactsFile();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    return newContact;
};

// Видалити контакт
export const removeContact = async (contactId) => {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) return null;

    const [removed] = contacts.splice(index, 1);
    await writeContactsFile(contacts);
    return removed;
};

export const updateContact = async (contactId, data) => {
    const contacts = await readContactsFile();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }

    contacts[index] = {...contacts[index], ...data};
    await writeContactsFile(contacts);

    return contacts[index];
}