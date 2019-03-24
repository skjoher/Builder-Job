const Joi = require('joi');
const Contacts = require('../models/contacts.model');

module.exports = {

  // GET /v1/contacts
  listContacts: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
    },
  },

  // POST /v1/contacts
  createContacts: {
    body: {
      email: Joi.string().email().required(),
      name: Joi.string().max(128),
    },
  },

  // PUT /v1/contacts/:contactsId
  replaceContacts: {
    body: {
      email: Joi.string().email().required(),
      name: Joi.string().max(128),
    },
    params: {
      contactsId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/contacts/:contactsId
  updateContacts: {
    body: {
      email: Joi.string().email(),
      name: Joi.string().max(128),
    },
    params: {
      contactsId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
