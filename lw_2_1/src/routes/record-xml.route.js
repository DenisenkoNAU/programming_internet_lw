const express = require('express');
const router = express.Router();

const { param } = require('express-validator');

const xmlparser = require('../middlewares/parser/parser-xml.middelware');
const {
  validateXmlRecordCreate,
  validateXmlRecordUpdate,
} = require('../middlewares/validation/validate-xml-record.middelware');
const validateRoute = require('../middlewares/validation/validate-route.middelware');

const controller = require('../controllers/record-xml.controller');

router.get('/', controller.getAll);

router.post(
  '/',
  xmlparser,
  validateXmlRecordCreate,
  controller.create,
);

router.put(
  '/:id',
  [
    param('id').isNumeric(),
  ],
  validateRoute,
  xmlparser,
  validateXmlRecordUpdate,

  controller.update
);

router.delete(
  '/:id',
  [
    param('id').isNumeric(),
  ],
  controller.remove,
);

module.exports = router;
