/** Complete local storage settings */
const STORAGE = {
  unsplash: {
    picture: {
      key: "unsplash_last_pic_src"
    },
    interval: {
      key: "unsplash_interval",
      label: "Unsplash new pic interval (in minutes)",
      type: "number"
    },
    updateTimestamp: {
      key: "unsplash_update_timestamp"
    }
  },
  weather: {
    apiKey: {
      key: "weather_api_key",
      label: "OpenWeatherMap Api Key",
      type: "text"
    },
    weather: {
      key: "weather_last_weather"
    },
    updateTimestamp: {
      key: "weather_update_timestamp"
    }
  }
};

/** What needs to be set by user */
const SETTINGS_NEEDED = {
  unsplash: ["interval"]
};

class Settings {
  constructor() {
    /** @type {{key: String, label: String, type: String, value: *}[]} @private */
    this._fields = this._createFields();
  }

  /**
   * @returns {{key: String, label: String, type: String, value: *}[]}
   */
  getFields() {
    return this._fields;
  }

  /**
   * @param {{key: String, label: String, type: String, value: *}[]} fields
   */
  saveFields(fields) {
    this._fields = fields;
    fields.forEach(field => {
      localStorage.setItem(field.key, field.value);
    });
  }

  /**
   * Fields init
   * @returns {{key: String, label: String, type: String, value: *}[]}
   * @private
   */
  _createFields() {
    const fields = [];

    Object.keys(SETTINGS_NEEDED).forEach(main => {
      SETTINGS_NEEDED[main].forEach(subMain => {
        const obj = STORAGE[main][subMain];
        fields.push({
          key: obj.key,
          label: obj.label,
          type: obj.type,
          value: this._getVal(obj.key)
        });
      });
    });

    return fields;
  }

  /**
   * @param {string} key
   * @returns {string}
   * @private
   */
  _getVal(key) {
    return localStorage.getItem(key) || "";
  }
}

export const storage = STORAGE;
export default Settings;
