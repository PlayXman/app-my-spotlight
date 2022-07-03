import { WeatherModel } from "./WeatherModel";
import { toFirstLetterUppercase } from "../utils";

export class Forecast {
  constructor() {
    /** @type {null | WeatherModel} The current weather. */
    this.current = null;
    /** @type {WeatherModel[]} The weather forecast for next 3 hours. */
    this.hourly = [];
    /** @type {{lon: number, lat: number}} Location of the forecast. */
    this.location = {
      lat: 0,
      lon: 0
    };
  }

  /**
   * @returns {boolean} True if the forecasts are not stale.
   */
  get isCurrent() {
    return this.current != null;
  }

  /**
   * Resets the forecast and removes all data.
   */
  reset() {
    this.current = null;
    this.hourly = [];
  }

  /**
   * Fills this model with data from the local storage payload.
   * @param {Forecast} payload
   */
  fromStorage(payload) {
    if (payload.current && payload.hourly) {
      this.location = {
        lat: payload.location.lat,
        lon: payload.location.lon
      };

      // Current
      this.current = new WeatherModel();
      this.current.temperature = payload.current._temperature;
      this.current.humidity = payload.current.humidity;
      this.current.uvi = payload.current.uvi;
      this.current.weather = payload.current.weather;
      this.current.weatherIcon = payload.current.weatherIcon;

      // 3 hour
      for (const hour of payload.hourly) {
        const w = new WeatherModel();
        w.temperature = hour._temperature;
        w.precipitation = hour.precipitation;
        w.uvi = hour.uvi;
        w.weather = hour.weather;
        w.weatherIcon = hour.weatherIcon;
        w.date = hour.date ? new Date(hour.date) : undefined;

        this.hourly.push(w);
      }
    }
  }

  /**
   * Fills this model with data from the weather server API payload.
   * @param {{
   *   "lat": number;
   *   "lon": number;
   *   "current"?: {
   *     "temp"?: number;
   *     "humidity"?: number;
   *     "uvi"?: number;
   *     "weather"?: Array<{
   *       "id"?: number;
   *       "main"?: string;
   *       "description"?: string;
   *       "icon"?: string;
   *     }>;
   *   };
   *   "hourly"?: Array<{
   *     "dt"?: number;
   *     "temp"?: number;
   *     "uvi"?: number;
   *     "weather"?: Array<{
   *       "id"?: number;
   *       "main"?: string;
   *       "description"?: string;
   *       "icon"?: string;
   *     }>;
   *     "pop"?: number;
   *   }>;
   * }} payload Data from the weather server API.
   * @see https://openweathermap.org/api/one-call-api
   */
  fromServer(payload) {
    this.reset();

    if (payload.current && payload.hourly) {
      this.location = {
        lat: payload.lat ?? 0,
        lon: payload.lon ?? 0
      };

      // Current
      this.current = new WeatherModel();
      this.current.temperature = payload.current.temp ?? -Infinity;
      this.current.humidity = payload.current.humidity ?? 0;
      this.current.uvi = payload.current.uvi ?? 0;
      this.current.weather = toFirstLetterUppercase(
        payload.current.weather?.[0]?.description ?? ""
      );
      this.current.weatherIcon = payload.current.weather?.[0]?.icon ?? "";

      // Next 3 hours
      for (let i = 1; i < 4; i++) {
        const hour = payload.hourly?.[i];
        if (hour) {
          const w = new WeatherModel();
          w.temperature = hour.temp ?? -Infinity;
          w.precipitation = hour.pop ?? 0;
          w.uvi = hour.uvi ?? 0;
          w.weather = toFirstLetterUppercase(
            hour.weather?.[0]?.description ?? ""
          );
          w.weatherIcon = hour.weather?.[0]?.icon ?? "";
          w.date = hour.dt ? new Date(hour.dt * 1000) : undefined;

          this.hourly.push(w);
        }
      }
    }
  }
}
