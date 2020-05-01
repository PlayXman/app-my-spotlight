import { storage } from "./Settings";
import { toJson } from "unsplash-js/lib/unsplash";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const INTERVAL = 10 * 60 * 1000;

class Weather {
  constructor() {
    this.apiKey = this._getApiKey();
  }

  isSet() {
    return this.apiKey.length > 0;
  }

  getLastWeather() {
    return Number(
      localStorage.getItem(storage.weather.weather.key) || -Infinity
    );
  }

  getTemperature() {
    return new Promise((resolve, reject) => {
      if (this._shouldUpdate()) {
        this._getLocation().then(location => {
          const params = new URLSearchParams({
            appid: this.apiKey,
            lat: location.lat,
            lon: location.lon
          });

          fetch(`${API_URL}?${params.toString()}`, {
            method: "GET"
          })
            .then(toJson)
            .then(json => {
              const temperature = this._kelvinToCelsius(json.main.temp);
              localStorage.setItem(
                storage.weather.updateTimestamp.key,
                String(Date.now())
              );
              localStorage.setItem(
                storage.weather.weather.key,
                String(temperature)
              );
              resolve(temperature);
            })
            .catch(err => {
              console.error(err);
              reject();
            });
        });
      } else {
        resolve(this.getLastWeather());
      }
    });
  }

  _getApiKey() {
    return process.env.VUE_APP_OPENWEATHERMAP_API_KEY || "";
  }

  /**
   * @param {number} temp
   * @returns {number}
   * @private
   */
  _kelvinToCelsius(temp) {
    return Math.round(temp - 273.15);
  }

  _shouldUpdate() {
    const u = localStorage.getItem(storage.weather.updateTimestamp.key);

    if (!u) return true;

    return Number(u) + INTERVAL < Date.now();
  }

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
