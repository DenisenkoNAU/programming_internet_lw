class RecordModel {
  /**
   * @param {Object} payload Объект данных
   * @returns {Object} Объект с нормализованными полями
   */
  static createFromPayload(payload) {
    const entityData = _mapFieldFromPayload(payload);
    entityData.id = String(Date.now());

    return entityData;
  }
  
  /**
   * @param {Object} payload Объект данных
   * @returns {Object} Объект с нормализованными полями
   */
  static updateFromPayload(payload) {
    const entityData = _mapFieldFromPayload(payload);
    Object.entries(entityData).forEach(([key, value]) => {
      if (!value) {
        delete entityData[key];
      }
    });

    return entityData;
  }
}

/**
  * @param {Object} payload Объект данных
  * @returns {Object} Объект с нормализованными полями
  */
function _mapFieldFromPayload(payload) {
  return {
      name: String(payload.name ?? '').trim(),
      lastname: String(payload.lastname ?? '').trim(),
      surname: String(payload.surname ?? '').trim(),
      education: String(payload.education ?? '').trim(),
      faculty: String(payload.faculty ?? '').trim(),
    };
}

module.exports = RecordModel;
