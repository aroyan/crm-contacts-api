import {
  addNewContact,
  deleteContact,
  getContacts,
  getContactsWithID,
  updateContact,
  searchContact,
} from "../controllers/crmController";

const routes = (app) => {
  app.route("/api").get((req, res) => {
    res.send({ contacts_list: `/api/contacts` });
  });
  app
    .route("/api/contacts")
    // Get all contacts
    .get((req, res, next) => {
      // Middleware
      // console.log(`Request from : ${req.originalUrl}`);
      // console.log(`Request type : ${req.method}`);
      next();
    }, getContacts)
    // Add contact
    .post(addNewContact);

  app
    .route("/api/contacts/:contactID")
    // Get specific contact
    .get((req, res, next) => {
      next();
    }, getContactsWithID)
    // Update specific contact
    .put(updateContact)
    // Delete specific contact
    .delete(deleteContact);

  app.route("/api/search").get(searchContact);
};

export default routes;
