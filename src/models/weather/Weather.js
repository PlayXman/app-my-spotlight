import StorageData from "../storage/StorageData";
import WeatherSettings from "../settings/WeatherSettings";
import { Forecast } from "./Forecast";
import { WeatherModel } from "./WeatherModel";

/** @type {string} Weather forecast website for the user. */
const WEATHER_WEBSITE_URL = "https://weather.com/en-AU/weather/today/l/";
/** @type {string} Weather server API URL. */
const API_URL = "https://api.openweathermap.org/data/2.5/onecall";
/** @type {number} The interval for  30 minutes */
const INTERVAL = 30 * 60 * 1000;
/** @type {string} */
const STORAGE_KEY = "weather";
/** @type {string} */
const LOG_PREFIX = "WEATHER MODEL -";

class Weather {
  constructor() {
    /** @type {string} */
    this._apiKey = this._getApiKey();
    /** @type {number} Timestamp of the stored data. */
    this._updated = 0;
  }

  /**
   * @returns {Promise<boolean>} True if the user activated the weather widget.
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
   * Fetches the weather info either from local storage or the forecast server.
   * @returns {Promise<Forecast>} The up-to-date weather forecast.
   */
  async getForecast() {
    let forecast;

    // Cached forecast
    try {
      forecast = await this._getCachedForecast();
    } catch (err) {
      forecast = err;
    }

    // Update and save forecast from server
    if (this._shouldUpdate()) {
      forecast.reset();

      try {
        const location = await this._getLocation();
        const params = new URLSearchParams({
          appid: this._apiKey,
          lat: location.lat,
          lon: location.lon,
          exclude: "minutely,daily,alerts"
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          method: "GET"
        });
        const json = await response.json();
        forecast.fromServer(json);
      } catch (err) {
        console.error(
          `${LOG_PREFIX} Weather forecast server request failed`,
          err
        );
      }

      try {
        await StorageData.put(STORAGE_KEY, forecast);
      } catch (err) {
        console.error(
          `${LOG_PREFIX} Local storage could not save the temperature`,
          err
        );
      }
    }

    // Return forecast
    await this._setTemperatureUnit();

    return forecast;
  }

  /**
   * @param {number} lat Latitude
   * @param {number} lon Longitude
   * @returns {string} Prepared weather website's URL.
   */
  getWebsiteUrl(lat, lon) {
    return `${WEATHER_WEBSITE_URL}${lat},${lon}`;
  }

  /**
   * Fetches weather from local storage.
   * @returns {Promise<Forecast>}
   * @private
   */
  async _getCachedForecast() {
    const forecast = new Forecast();

    try {
      const tempData = await StorageData.get(STORAGE_KEY);
      this._updated = tempData.updated;
      forecast.fromStorage(tempData.data);

      return forecast;
    } catch (err) {
      return Promise.reject(forecast);
    }
  }

  /**
   * @returns {string} API key for the weather forecast server.
   * @private
   */
  _getApiKey() {
    return process.env.VUE_APP_OPENWEATHERMAP_API_KEY || "";
  }

  /**
   * Sets the temperature unit from the user's settings. The weather will be converted to this unit.
   * @returns {Promise<void>}
   * @private
   */
  async _setTemperatureUnit() {
    const settings = await WeatherSettings.getSettings();

    if (settings && settings.unit === "f") {
      WeatherModel.setTemperatureUnit("f");
    } else {
      WeatherModel.setTemperatureUnit("c");
    }
  }

  /**
   * Should the weather be updated from the forecast server?
   * @returns {boolean}
   * @private
   */
  _shouldUpdate() {
    if (!this._updated) return true;

    return this._updated + INTERVAL < Date.now();
  }

  /**
   * Gets the device's current location.
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
