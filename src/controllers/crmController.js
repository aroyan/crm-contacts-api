import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = (req, res) => {
  let newContact = new Contact(req.body);

  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const getContacts = (req, res) => {
  const { page = 0, limit = 5 } = req.query;

  Contact.find({}, (err, contacts) => {
    if (err) {
      res.send(err);
    } else {
      Contact.estimatedDocumentCount({}).exec((err, totalItems) => {
        if (err) {
          throw new Error(err);
        }
        const totalPages = Math.floor(totalItems / limit);
        res.status(200).json({
          totalItems,
          totalPages,
          page,
          contacts,
        });
      });
    }
  })
    .skip(page * limit)
    .limit(limit);
};

export const getContactsWithID = (req, res) => {
  Contact.findById(req.params.contactID, (err, contact) => {
    if (err) {
      return res.send(err);
    }
    return res.json(contact);
  });
};

export const updateContact = (req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactID },
    req.body,
    { new: true, useFindAndModifiy: false },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    }
  );
};

export const deleteContact = (req, res) => {
  Contact.deleteOne({ _id: req.params.contactID }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Deleted succesfully" });
  });
};

// If you have millions of data make sure to use `estimatedDocumentCount` instead of `countDocuments`

export const searchContact = (req, res) => {
  const { q, page = 0, limit = 5 } = req.query;
  Contact.find(
    { firstName: { $regex: new RegExp(q, "i") } },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      if (!contact.length) {
        res.json({ error: `${q} not found` });
      } else {
        res.json({ total: contact.length, contact });
      }
    }
  );
};
