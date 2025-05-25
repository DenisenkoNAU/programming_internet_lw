const RecordModel = require('../../../models/record.model');

class RecordStrategy {
  constructor(strategy) {
    this.strategy = strategy;
  }

  _getRecordIndex(data, id) {
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Record not found');
    }

    return index;
  }

  _mapCreateRecord(data, payload) {
    const newRecord = RecordModel.createFromPayload(payload);
    data.push(newRecord);

    return {
      newRecord,
    };
  }

  _mapUpdateRecord(data, id, payload) {
    const index = this._getRecordIndex(data, id);

    const updateRecordPayload = RecordModel.updateFromPayload(payload);

    data[index] = {
      ...data[index],
      ...updateRecordPayload,
    };

    return data[index];
  };

  async getAll() {
    return this.strategy.getAll();
  }

  async create(payload) {
    const data = await this.strategy.getAll();
    const { newRecord } = this._mapCreateRecord(data, payload);

    await this.strategy.writeFile(data);

    return newRecord;
  }

  async update(id, payload) {
    const data = await this.strategy.getAll();

    const updateRecord = this._mapUpdateRecord(data, id, payload);
  
    await this.strategy.writeFile(data);

    return updateRecord;
  };

  async remove(id) {
    const data = await this.getAll();
    const index = this._getRecordIndex(data, id);

    data.splice(index, 1);

    await this.strategy.writeFile(data);
  };
}

module.exports = RecordStrategy;
