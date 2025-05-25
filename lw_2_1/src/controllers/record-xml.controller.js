const withErrorHandler = require('../utils/with-error-handler');
const recordService = require('../service/record/record.service');

const getAll = withErrorHandler(async (req, res) => {
  const data = await recordService.getAll('xml');
  const dataXml = recordService.mapToXml(data);

  res.set('Content-Type', 'application/xml');
  res.send(dataXml);
});

const create = withErrorHandler(async (req, res) => {
  const body = req.body?.record;
  const data = await recordService.create('xml', body);
  const dataXml = recordService.mapToXml(data);

  res.set('Content-Type', 'application/xml');
  res.status(201);
  res.send(dataXml);
});

const update = withErrorHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body?.record;
  const data = await recordService.update('xml', id, body);

  const dataXml = recordService.mapToXml(data);

  res.set('Content-Type', 'application/xml');
  res.send(dataXml);
});

const remove = withErrorHandler(async (req, res) => {
  const { id } = req.params;
  await recordService.remove('xml', id);
  res.status(204).send();
});

module.exports = {
  getAll,
  create,
  update,
  remove
};
