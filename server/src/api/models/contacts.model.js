const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../utils/APIError');

/**
* contacts Roles
*/
const roles = ['user', 'admin'];

/**
 * contacts Schema
 * @private
 */
const contactsSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    minlength: 6,
    maxlength: 128,
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  bname: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },

  ctype: {
    type: String,
    enum: roles,
    default: 'admin',
  },
  desc: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});


    /**
 * Methods
 */
contactsSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'bname','email', 'mobile', 'desc', 'ctype', 'createTime'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
contactsSchema.statics = {

  roles,

  /**
   * Get contacts
   *
   * @param {ObjectId} id - The objectId of contacts.
   * @returns {Promise<contacts, APIError>}
   */
  async get(id) {
    try {
      let contacts;

      if (mongoose.Types.ObjectId.isValid(id)) {
        contacts = await this.findById(id).exec();
      }
      if (contacts) {
        return contacts;
      }

      throw new APIError({
        message: 'contacts does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },



  /**
   * List contactss in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of contactss to be skipped.
   * @param {number} limit - Limit number of contactss to be returned.
   * @returns {Promise<contacts[]>}
   */
  list({
    page = 1, perPage = 30, name, email, role,
  }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"email" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

};

/**
 * @typedef Contacts
 */
module.exports = mongoose.model('Contacts', contactsSchema);
