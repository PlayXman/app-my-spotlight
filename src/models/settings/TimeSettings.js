import Settings from "./Settings";

/** @type {string} */
const STORE_KEY = "time";

class TimeSettings extends Settings {
  /**
   * @returns {Promise<{enabled: boolean, hour24: boolean} | null>} Null if nothing found
   */
  static async getSettings() {
    try {
      const time = await this._loadStoredData(STORE_KEY);
      return time.data;
    } catch (err) {
      return null;
    }
  }

  /**
   * @param {boolean} isOn
   * @param {boolean} hour24
   * @returns {Promise<void>}
   */
  static async handleDataChange(isOn, hour24 = true) {
    try {
      const data = {
        enabled: isOn,
        hour24: hour24
      };
      await this._saveDataToStore(STORE_KEY, data);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    } finally {
      this.dispatchUpdate();
    }
  }
}

export default TimeSettings;
