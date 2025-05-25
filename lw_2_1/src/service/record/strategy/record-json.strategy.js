const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../../../data/records.json');

class RecordJsonStrategy {
  async writeFile(payload) {
    const data = JSON.stringify(payload, null, 2);
    return fs.writeFile(filePath, data);
  }

  async getAll() {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }
}

module.exports = RecordJsonStrategy;
