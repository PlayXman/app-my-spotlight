import Settings from "./Settings";

/** @type {string} */
const STORE_KEY = "todoist";

class TodolistSettings extends Settings {
  /**
   * @returns {Promise<{}|null>} Null if nothing found
   */
  static async getSettings() {
    try {
      const settings = await this._loadStoredData(STORE_KEY);
      return settings.data;
    } catch (err) {
      return null;
    }
  }

  /**
   * @param {string} apiKey
   * @param {string} filters
   * @returns {Promise<void>}
   */
  static async handleDataChange(apiKey, filters = "") {
    try {
      const data = {
        apiKey,
        filters
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

export default TodolistSettings;
