const express = require('express');
const router = express.Router();

const { body, param } = require('express-validator');

const validateRoute = require('../middlewares/validation/validate-route.middelware');

const controller = require('../controllers/record-json.controller');

router.get('/', controller.getAll);

router.post(
  '/',
  [
    body('name').notEmpty().trim().escape(),
    body('lastname').notEmpty().trim().escape(),
    body('surname').notEmpty().trim().escape(),
    body('education').notEmpty().trim().escape(),
    body('faculty').notEmpty().trim().escape(),
  ],
  validateRoute,
  controller.create,
);

router.put(
  '/:id',
  [
    param('id').isNumeric(),
  ],
  validateRoute,
  controller.update,
);

router.delete(
  '/:id',
  [
    param('id').isNumeric(),
  ],
  validateRoute,
  controller.remove,
);

module.exports = router;
