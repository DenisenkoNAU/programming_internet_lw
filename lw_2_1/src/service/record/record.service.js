const RecordStrategy = require('./strategy/record.strategy');
const RecordJsonStrategy = require('./strategy/record-json.strategy');
const RecordXmlStrategy = require('./strategy/record-xml.strategy');

const strategies = {
  xml: new RecordStrategy(new RecordXmlStrategy()),
  json: new RecordStrategy(new RecordJsonStrategy()),
}

function _getStrategy(type) {
  const strat = strategies[type];
  if (!strat) {
    throw new Error(`Unsupported type: ${type}`);
  }
  return strat;
}

const getAll = async (type) => {
  const staregy = _getStrategy(type);
  return staregy.getAll();
};

const create = async (type, payload) => {
  const staregy = _getStrategy(type);
  return staregy.create(payload);
};

const update = async (type, id, payload) => {
  const staregy = _getStrategy(type);
  return staregy.update(id, payload);
};

const remove = async (type, id) => {
  const staregy = _getStrategy(type);
  return staregy.remove(id);
};

const mapToXml = (payload) => {
  return RecordXmlStrategy.mapToXml(payload);
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  mapToXml,
};
