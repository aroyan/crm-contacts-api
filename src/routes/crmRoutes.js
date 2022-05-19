import {
  addNewContact,
  deleteContact,
  getContacts,
  getContactsWithID,
  updateContact,
} from "../controllers/crmController";

const routes = (app) => {
  app
    .route("/contact")
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
    .route("/contact/:contactID")
    // Get specific contact
    .get((req, res, next) => {
      next();
    }, getContactsWithID)
    // Update specific contact
    .put(updateContact)
    // Delete specific contact
    .delete(deleteContact);
};

export default routes;
