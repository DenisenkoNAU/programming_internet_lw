const fs = require('fs/promises');
const path = require('path');
const xml2js = require('xml2js');

const filePath = path.join(__dirname, '../../../data/records.xml');
const builder = new xml2js.Builder({ rootName: 'records', headless: true });

class RecordXmlStrategy {
  static mapToXml(payload) {
    const data = builder.buildObject({ record: payload });
    return data;
  }

  async writeFile(payload) {
    const data = RecordXmlStrategy.mapToXml(payload);
    return fs.writeFile(filePath, data);
  }

  async getAll() {
    const content = await fs.readFile(filePath, 'utf-8');
    const dataXml = await xml2js.parseStringPromise(content, { explicitArray: false });
    const records = dataXml?.records?.record ?? [];

    return Array.isArray(records) ? records : [records];
  }
}

module.exports = RecordXmlStrategy;
