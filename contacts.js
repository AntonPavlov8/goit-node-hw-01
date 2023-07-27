const fs = require("fs").promises;

const contactsPath = __dirname + "/db/contacts.json";
const readContacts = fs.readFile(contactsPath).then((data) => {
  return JSON.parse(data);
});

async function listContacts() {
  const allContacts = await readContacts;
  console.table(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await readContacts;
  console.log(allContacts.find((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const allContacts = await readContacts;
  const newData = allContacts.filter((contact) => {
    return contact.id !== contactId;
  });
  console.log(`Contact with id ${contactId} was deleted`);
  fs.writeFile(contactsPath, JSON.stringify(newData));
}

async function addContact(name, email, phone) {
  const { nanoid } = await import("nanoid");
  const allContacts = await readContacts;
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(`Contact with name ${name} was added`);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
