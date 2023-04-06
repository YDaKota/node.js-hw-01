const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;

//     fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
//         if (err) { console.log(err.message) }
//             const contacts = JSON.parse(data)
//             const contactsNew = {id: shortid.generate(), name, email, phone }
//             const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t')

//             fs.writeFile(contactsPath, contactsList, (err) => { if (err) console.error(err) })
//     })
//   }
//   try {
//     addContact()
//   } catch (error) {
//     next(error)
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}