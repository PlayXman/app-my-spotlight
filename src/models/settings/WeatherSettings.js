import Settings from "./Settings";

/** @type {string} */
const STORE_KEY = "weather";

class WeatherSettings extends Settings {
  /**
   * @returns {Promise<{enabled: boolean, unit: "c" | "f"}|null>} Null if nothing found
   */
  static async getSettings() {
    try {
      const weather = await this._loadStoredData(STORE_KEY);
      return weather.data;
    } catch (err) {
      return null;
    }
  }

  /**
   * @param {boolean} isOn
   * @param {"c" | "f"} unit
   * @returns {Promise<void>}
   */
  static async handleDataChange(isOn, unit = "c") {
    try {
      const data = {
        enabled: isOn,
        unit: unit
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

export default WeatherSettings;
