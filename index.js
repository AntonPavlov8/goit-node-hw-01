const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const options = {
  action: {
    describe: "action",
    type: "string",
    demandOption: true,
    choices: ["list", "get", "add", "remove"],
  },
  id: {
    describe: "user id",
    type: "string",
  },
  name: {
    describe: "new user name",
    type: "string",
  },
  email: {
    describe: "new user email",
    type: "string",
  },
  phone: {
    describe: "new user phone",
    type: "string",
  },
};

const argv = require("yargs/yargs")(process.argv.slice(2)).options(
  options
).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
