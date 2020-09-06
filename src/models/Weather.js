import StorageData from "./storage/StorageData";
import WeatherSettings from "./settings/WeatherSettings";

/** @type {string} */
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
/** @type {number} */
const INTERVAL = 10 * 60 * 1000;
/** @type {string} */
const STORAGE_KEY = "weather";

class Weather {
  constructor() {
    /** @type {string} */
    this._apiKey = this._getApiKey();
    /** @type {number} */
    this._updated = 0;
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isEnabled() {
    const settings = await WeatherSettings.getSettings();

    if (settings) {
      return this._apiKey.length > 0 && settings.enabled;
    } else {
      return false;
    }
  }

  /**
   * @returns {Promise<{temp: Number, unit: String}>} Temperature in celsius or fahrenheit
   */
  async getTemperature() {
    let kelvins;
    try {
      kelvins = await this._getLastWeather();
    } catch (err) {
      kelvins = err;
    }

    if (this._shouldUpdate()) {
      const location = await this._getLocation();
      const params = new URLSearchParams({
        appid: this._apiKey,
        lat: location.lat,
        lon: location.lon
      });

      const response = await fetch(`${API_URL}?${params.toString()}`, {
        method: "GET"
      });
      const json = await response.json();
      const temperature = json.main.temp;

      try {
        await StorageData.put(STORAGE_KEY, temperature);
        kelvins = temperature;
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    }

    return await this._convertTemperature(kelvins);
  }

  /**
   * @returns {Promise<number, number>}
   * @private
   */
  async _getLastWeather() {
    try {
      const tempData = await StorageData.get(STORAGE_KEY);
      this._updated = tempData.updated;
      return tempData.data;
    } catch (err) {
      return Promise.reject(-Infinity);
    }
  }

  /**
   * @returns {string}
   * @private
   */
  _getApiKey() {
    return process.env.VUE_APP_OPENWEATHERMAP_API_KEY || "";
  }

  /**
   * @param {number} kelvins
   * @returns {Promise<{temp: Number, unit: String}>} Temperature in celsius or fahrenheit
   * @private
   */
  async _convertTemperature(kelvins) {
    const settings = await WeatherSettings.getSettings();
    const obj = {
      temp: 0,
      unit: "C"
    };

    if (settings && settings.unit === "f") {
      obj.temp = this._kelvinToFahrenheit(kelvins);
      obj.unit = "F";
    } else {
      obj.temp = this._kelvinToCelsius(kelvins);
    }

    return obj;
  }

  /**
   * @param {number} temp
   * @returns {number}
   * @private
   */
  _kelvinToCelsius(temp) {
    return Math.round(temp - 273.15);
  }

  /**
   * @param {number} temp
   * @returns {number}
   * @private
   */
  _kelvinToFahrenheit(temp) {
    return Math.round(temp * (9 / 5) - 459.67);
  }

  /**
   * @returns {boolean}
   * @private
   */
  _shouldUpdate() {
    if (!this._updated) return true;

    return this._updated + INTERVAL < Date.now();
  }

  /**
   * @returns {Promise<{lat: string, lon: string}>}
   * @private
   */
  _getLocation() {
    return new Promise((resolve, reject) => {
      const location = {
        lat: "",
        lon: ""
      };

      navigator.geolocation.getCurrentPosition(
        position => {
          location.lat = position.coords.latitude;
          location.lon = position.coords.longitude;

          resolve(location);
        },
        () => {
          console.error("Enable geolocation for weather info.");
          reject(location);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: INTERVAL
        }
      );
    });
  }
}

export default Weather;
