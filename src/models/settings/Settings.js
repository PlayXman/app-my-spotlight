import Storage from "../storage/Storage";

/** @type {string} */
const STORE_NAME = "settings";
/** @type {string} */
const EVENT_NAME = "settingsUpdate";

class Settings {
  /**
   * Dispatches "settingsUpdate" event
   */
  static dispatchUpdate() {
    const event = new CustomEvent(EVENT_NAME);
    document.dispatchEvent(event);
  }

  /**
   * Listens for settings updates
   * @param {function} cb
   */
  static observeUpdate(cb) {
    document.addEventListener(EVENT_NAME, cb);
  }

  /**
   * Removes settings listener
   * @param {function} f Function to be removed
   */
  static removeObserver(f) {
    document.removeEventListener(EVENT_NAME, f);
  }

  /**
   * @param {string} key
   * @returns {Promise<{category: string, data: any, updated: number} | string>}
   * @protected
   */
  static _loadStoredData(key) {
    return Storage()
      .store(STORE_NAME)
      .get(key);
  }

  /**
   * @param {string} key
   * @param {any} data
   * @returns {Promise<void | string>}
   * @protected
   */
  static _saveDataToStore(key, data) {
    return Storage()
      .store(STORE_NAME)
      .put({
        category: key,
        data: data,
        updated: new Date().getTime()
      });
  }
}

export const SETTINGS_STORE_NAME = STORE_NAME;
export default Settings;
