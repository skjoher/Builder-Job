const httpStatus = require('http-status');
const { omit } = require('lodash');
const Contacts = require('../models/contacts.model');

/**
 * Load contacts and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const contacts = await Contacts.get(id);
    req.locals = { contacts };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get contacts
 * @public
 */
exports.get = (req, res) => res.json(req.locals.contacts.transform());

/**
 * Get logged in contacts info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.contacts.transform());

/**
 * Create new contacts
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const contacts = new Contacts(req.body);
    const savedContacts = await contacts.save();
    res.status(httpStatus.CREATED);
    res.json(savedContacts.transform());
  } catch (error) {
    next(Contacts.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing contacts
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { contacts } = req.locals;
    const newContacts = new Contacts(req.body);
    const ommitRole = contacts.role !== 'admin' ? 'role' : '';
    const newContactsObject = omit(newContacts.toObject(), '_id', ommitRole);

    await contacts.update(newContactsObject, { override: true, upsert: true });
    const savedContacts = await Contacts.findById(contacts._id);

    res.json(savedContacts.transform());
  } catch (error) {
    next(Contacts.checkDuplicateEmail(error));
  }
};

/**
 * Update existing contacts
 * @public
 */
exports.update = (req, res, next) => {
  const ommitRole = req.locals.contacts.role !== 'admin' ? 'role' : '';
  const updatedContacts = omit(req.body, ommitRole);
  const contacts = Object.assign(req.locals.contacts, updatedContacts);

  contacts.save()
    .then(savedContacts => res.json(savedContacts.transform()))
    .catch(e => next(Contacts.checkDuplicateEmail(e)));
};

/**
 * Get contacts list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await Contacts.list(req.query);
    const transformedContactss = users.map(contacts => contacts.transform());
    res.json(transformedContactss);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete contacts
 * @public
 */
exports.remove = (req, res, next) => {
  const { contacts } = req.locals;

  contacts.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
