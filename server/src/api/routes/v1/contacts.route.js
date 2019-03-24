const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/contacts.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  listContacts,
  createContacts,
  replaceContacts,
  updateContacts,
} = require('../../validations/contacts.validation');

const router = express.Router();

/**
 * Load contacts when API with contactsId route parameter is hit
 */
router.param('contactsId', controller.load);


router
  .route('/')
  /**
   * @api {get} v1/contacts List Contacts
   * @apiDescription Get a list of contacts
   * @apiVersion 1.0.0
   * @apiName ListContacts
   * @apiGroup Contacts
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Contacts per page
   * @apiParam  {String}             [name]       Contacts's name
   * @apiParam  {String}             [email]      Contacts's email
   * @apiParam  {String=contacts,admin}  [role]       Contacts's role
   *
   * @apiSuccess {Object[]} contacts List of contacts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated contacts can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), validate(listContacts), controller.list)
  /**
   * @api {post} v1/contacts Create Contacts
   * @apiDescription Create a new contacts
   * @apiVersion 1.0.0
   * @apiName CreateContacts
   * @apiGroup Contacts
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiParam  {String}             email     Contacts's email
   * @apiParam  {String{6..128}}     password  Contacts's password
   * @apiParam  {String{..128}}      [name]    Contacts's name
   * @apiParam  {String=contacts,admin}  [role]    Contacts's role
   *
   * @apiSuccess (Created 201) {String}  id         Contacts's id
   * @apiSuccess (Created 201) {String}  name       Contacts's name
   * @apiSuccess (Created 201) {String}  email      Contacts's email
   * @apiSuccess (Created 201) {String}  role       Contacts's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated contacts can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), validate(createContacts), controller.create);


router
  .route('/profile')
  /**
   * @api {get} v1/contacts/profile Contacts Profile
   * @apiDescription Get logged in contacts profile information
   * @apiVersion 1.0.0
   * @apiName ContactsProfile
   * @apiGroup Contacts
   * @apiPermission contacts
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiSuccess {String}  id         Contacts's id
   * @apiSuccess {String}  name       Contacts's name
   * @apiSuccess {String}  email      Contacts's email
   * @apiSuccess {String}  role       Contacts's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Contacts can access the data
   */
  .get(authorize(), controller.loggedIn);


router
  .route('/:contactsId')
  /**
   * @api {get} v1/contacts/:id Get Contacts
   * @apiDescription Get contacts information
   * @apiVersion 1.0.0
   * @apiName GetContacts
   * @apiGroup Contacts
   * @apiPermission contacts
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiSuccess {String}  id         Contacts's id
   * @apiSuccess {String}  name       Contacts's name
   * @apiSuccess {String}  email      Contacts's email
   * @apiSuccess {String}  role       Contacts's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can access the data
   * @apiError (Forbidden 403)    Forbidden    Only contacts with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Contacts does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/contacts/:id Replace Contacts
   * @apiDescription Replace the whole contacts document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceContacts
   * @apiGroup Contacts
   * @apiPermission contacts
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiParam  {String}             email     Contacts's email
   * @apiParam  {String{6..128}}     password  Contacts's password
   * @apiParam  {String{..128}}      [name]    Contacts's name
   * @apiParam  {String=contacts,admin}  [role]    Contacts's role
   * (You must be an admin to change the contacts's role)
   *
   * @apiSuccess {String}  id         Contacts's id
   * @apiSuccess {String}  name       Contacts's name
   * @apiSuccess {String}  email      Contacts's email
   * @apiSuccess {String}  role       Contacts's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only contacts with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Contacts does not exist
   */
  .put(authorize(LOGGED_USER), validate(replaceContacts), controller.replace)
  /**
   * @api {patch} v1/contacts/:id Update Contacts
   * @apiDescription Update some fields of a contacts document
   * @apiVersion 1.0.0
   * @apiName UpdateContacts
   * @apiGroup Contacts
   * @apiPermission contacts
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiParam  {String}             email     Contacts's email
   * @apiParam  {String{6..128}}     password  Contacts's password
   * @apiParam  {String{..128}}      [name]    Contacts's name
   * @apiParam  {String=contacts,admin}  [role]    Contacts's role
   * (You must be an admin to change the contacts's role)
   *
   * @apiSuccess {String}  id         Contacts's id
   * @apiSuccess {String}  name       Contacts's name
   * @apiSuccess {String}  email      Contacts's email
   * @apiSuccess {String}  role       Contacts's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only contacts with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Contacts does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateContacts), controller.update)
  /**
   * @api {patch} v1/contacts/:id Delete Contacts
   * @apiDescription Delete a contacts
   * @apiVersion 1.0.0
   * @apiName DeleteContacts
   * @apiGroup Contacts
   * @apiPermission contacts
   *
   * @apiHeader {String} Authorization   Contacts's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated contacts can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Contacts does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);


module.exports = router;
