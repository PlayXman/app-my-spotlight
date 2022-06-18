/** @type {'c' | 'f' | ''} Temperature units */
let temperatureUnit = "";

export class WeatherModel {
  constructor() {
    /** @type {number} Temperature in kelvins. Is -Infinity if not set. @private */
    this._temperature = -Infinity;
    /** @type {number} Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%. */
    this.precipitation = 0;
    /** @type {number} Humidity; in percents (%). */
    this.humidity = 0;
    /** @type {number} UV index. */
    this.uvi = 0;
    /** @type {string} Weather description. */
    this.weather = "";
    /**
     * @type {string} Icon code.
     * @see https://openweathermap.org/weather-conditions#How-to-get-icon-URL
     */
    this.weatherIcon = "";
    /**
     * @type {undefined | Date} For which date is the forecast.
     */
    this.date = undefined;
  }

  /**
   * @param {number} temp
   */
  set temperature(temp) {
    this._temperature = temp;
  }

  /**
   * @returns {number} Temperature in celsius or fahrenheit depending on the user settings.
   */
  get temperature() {
    switch (temperatureUnit) {
      case "c":
        return this._convertKelvinToCelsius(this._temperature);
      case "f":
        return this._convertKelvinToFahrenheit(this._temperature);
      default:
        return -Infinity;
    }
  }

  /**
   * @returns {"c"|"f"|""} The temperature unit.
   */
  get temperatureUnit() {
    return temperatureUnit;
  }

  /**
   * @param {'c' | 'f'} units Into which unit is supposed to be the temperature value converted.
   */
  static setTemperatureUnit(units) {
    temperatureUnit = units;
  }

  /**
   * @param {number} temp
   * @returns {number}
   * @private
   */
  _convertKelvinToCelsius(temp) {
    return Math.round(temp - 273.15);
  }

  /**
   * @param {number} temp
   * @returns {number}
   * @private
   */
  _convertKelvinToFahrenheit(temp) {
    return Math.round(temp * (9 / 5) - 459.67);
  }
}
