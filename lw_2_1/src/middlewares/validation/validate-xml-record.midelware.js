const _checkRootTag = (record) => {
  if (!record) {
    return res.status(400).send('<error><item>Root tag <record> required</item></error>');
  }
}

const validateXmlRecordCreate = (req, res, next) => {
  const record = req.body?.record;

  _checkRootTag(record);

  const requiredFields = ['name', 'lastname', 'surname', 'education', 'faculty'];

  const missing = requiredFields.filter(field => !record[field] || !record[field].trim());

  if (missing.length > 0) {
    const error = `<error>${missing.map(z => {
      return `<item> field<${z}> is required</item>`
    })}</error>`;
    return res.status(400).send(error);
  }

  next();
}

const validateXmlRecordUpdate = (req, res, next) => {
  const record = req.body?.record;

  _checkRootTag(record);

  next();
}

module.exports = {
  validateXmlRecordCreate,
  validateXmlRecordUpdate,
};
