import Db from "./Storage";

/** @type {string} */
const STORE_NAME = "data";

class StorageData {
  /**
   * @param {string} type
   * @returns {Promise<{type: string, data: any, updated: number}>}
   */
  static get(type) {
    return Db()
      .store(STORE_NAME)
      .get(type);
  }

  /**
   * @param {string} type
   * @param {any} data
   * @returns {Promise<void>}
   */
  static put(type, data) {
    return Db()
      .store(STORE_NAME)
      .put(this._createObject(type, data));
  }

  /**
   * @param {string} key
   * @param {any} data
   * @returns {{data: any, type: string, updated: number}}
   * @private
   */
  static _createObject(key, data) {
    return {
      type: key,
      data: data,
      updated: new Date().getTime()
    };
  }
}

export const DATA_STORE_NAME = STORE_NAME;
export default StorageData;
