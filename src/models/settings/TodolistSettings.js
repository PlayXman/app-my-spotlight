import Settings from "./Settings";

/** @type {string} */
const STORE_KEY_APIKEY = "todoistApiKey";

class TodolistSettings extends Settings {
  /**
   * @returns {Promise<string>} Empty string if api key is not defined
   */
  static async getApiKey() {
    try {
      const apiKey = await this._loadStoredData(STORE_KEY_APIKEY);
      return apiKey.data;
    } catch (err) {
      return "";
    }
  }

  /**
   * @param {string} value
   * @returns {Promise<void>}
   */
  static async handleApiKeyChange(value) {
    try {
      await this._saveDataToStore(STORE_KEY_APIKEY, value);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    } finally {
      this.dispatchUpdate();
    }
  }
}

export default TodolistSettings;
