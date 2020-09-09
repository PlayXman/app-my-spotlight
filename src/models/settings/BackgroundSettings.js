import Settings from "./Settings";

/** @type {string} */
const STORE_KEY = "background";

class BackgroundSettings extends Settings {
  /**
   * @returns {Promise<string>} Empty string if keys are not defined
   */
  static async getSearchKeys() {
    try {
      const apiKey = await this._loadStoredData(STORE_KEY);
      return apiKey.data.keys;
    } catch (err) {
      return "";
    }
  }

  /**
   * @param {string} keys
   * @returns {Promise<void>}
   */
  static async handleChange(keys) {
    try {
      const obj = {
        keys: keys.replace(/["']/g, "")
      };
      await this._saveDataToStore(STORE_KEY, obj);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    } finally {
      this.dispatchUpdate();
    }
  }
}

export default BackgroundSettings;
