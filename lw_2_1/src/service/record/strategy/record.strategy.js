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

  /**
   * Возвращает все записи из источника данных
   * @name IRecordStorageStrategy#getAll
   * @returns {Promise<Array<Object>>}
   */
  async getAll() {
    return this.strategy.getAll();
  }

  /**
   * Создаёт новую запись
   * @param {Object} payload
   * @returns {Promise<Object>} новая запись
   */
  async create(payload) {
    const data = await this.strategy.getAll();
    const { newRecord } = this._mapCreateRecord(data, payload);

    await this.strategy.writeFile(data);

    return newRecord;
  }

  /**
   * Обновляет запись по ID
   * @param {string} id
   * @param {Object} payload
   * @returns {Promise<Object>} обновлённая запись
   */
  async update(id, payload) {
    const data = await this.strategy.getAll();

    const updateRecord = this._mapUpdateRecord(data, id, payload);
  
    await this.strategy.writeFile(data);

    return updateRecord;
  };

  /**
   * Удаляет запись по ID
   * @param {string} id
   * @returns {Promise<void>}
   */
  async remove(id) {
    const data = await this.getAll();
    const index = this._getRecordIndex(data, id);

    data.splice(index, 1);

    await this.strategy.writeFile(data);
  };
}

module.exports = RecordStrategy;
