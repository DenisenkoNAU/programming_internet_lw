const xmlparser = require('express-xml-bodyparser');

module.exports = xmlparser({
  explicitArray: false,
});
