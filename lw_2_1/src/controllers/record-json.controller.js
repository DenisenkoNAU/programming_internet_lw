const withErrorHandler = require('../utils/with-error-handler');
const recordService = require('../service/record/record.service');

const getAll = withErrorHandler(async (req, res) => {
  const data = await recordService.getAll('json');
  res.json(data);
});

const create = withErrorHandler(async (req, res) => {
  const body = req.body;
  const data = await recordService.create('json', body);
  res.status(201).json(data);
});

const update = withErrorHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const data = await recordService.update('json', id, body);
  res.json(data);
});

const remove = withErrorHandler(async (req, res) => {
  const { id } = req.params;
  await recordService.remove('json', id);
  res.status(204).send();
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
