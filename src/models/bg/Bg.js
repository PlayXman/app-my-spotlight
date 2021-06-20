import Unsplash from "unsplash-js";
import { toJson } from "unsplash-js/lib/unsplash";
import StorageData from "../storage/StorageData";
import BackgroundSettings from "../settings/BackgroundSettings";
import BgPicture from "./BgPicture";

/** @link https://unsplash.com/documentation#get-a-random-photo */
const PHOTO_CATEGORY_PARAMS = {
  query: "landscape",
  orientation: "landscape"
};
/** @type {number} in minutes */
const REFRESH_INTERVAL = 30;
/** @type {string} */
const STORAGE_KEY = "bgPicture";
/** @type {string} */
const EVENT_NAME = "backgroundUpdate";
/** @type {BgPicture|null} */
let picture = null;

class Bg {
  constructor() {
    /** @type {string} @private */
    this._apiKey = this._getApiKey();
    /** @type {Unsplash|null} @private */
    this._unsplash = this._apiKey
      ? new Unsplash({
          accessKey: this._apiKey
        })
      : null;
    /** @type {number} @private */
    this._updated = 1;
  }

  static getPicture() {
    return picture;
  }

  /**
   * Listens for settings updates
   * @param {Function} cb Parameter is <BgPicture|null>
   */
  static observeUpdate(cb) {
    document.addEventListener(EVENT_NAME, cb);
  }

  /**
   * Removes settings listener
   * @param {Function} f Function to be removed
   */
  static removeObserver(f) {
    document.removeEventListener(EVENT_NAME, f);
  }

  /**
   * @returns {Promise<BgPicture>} Last pic url if rejected
   */
  async getImage() {
    try {
      picture = await this._getCachedPic();
    } catch (defaultPic) {
      picture = defaultPic;
    }

    if (!picture.isSet() && this._shouldUpdate()) {
      try {
        picture = await this._fetchNewPic();
      } catch (err) {
        picture = err;
      }
    } else if (this._shouldUpdate()) {
      this._fetchNewPic();
    }

    this._dispatchUpdate();

    return picture;
  }

  /**
   * Dispatches "backgroundUpdate" event
   * @private
   */
  _dispatchUpdate() {
    const event = new CustomEvent(EVENT_NAME, { detail: picture });
    document.dispatchEvent(event);
  }

  /**
   * Fetches cached picture
   * @returns {Promise<BgPicture>} Last downloaded pic url
   */
  async _getCachedPic() {
    const picture = new BgPicture();

    try {
      const cachedPic = await StorageData.get(STORAGE_KEY);

      picture.link = cachedPic.data.link;
      picture.location = cachedPic.data.location;
      picture.url = cachedPic.data._urlBlob;
      this._updated = cachedPic.updated;

      return picture;
    } catch (err) {
      return Promise.reject(picture);
    }
  }

  /**
   * Fetches new picture from unsplash and saves it
   * @returns {Promise<BgPicture|null>}
   * @private
   */
  async _fetchNewPic() {
    const picture = new BgPicture();

    //fetch new pic
    try {
      const keys = await BackgroundSettings.getSearchKeys();
      const params = keys
        ? { ...PHOTO_CATEGORY_PARAMS, query: keys }
        : PHOTO_CATEGORY_PARAMS;
      const uResponse = await this._unsplash.photos.getRandomPhoto(params);
      const json = await toJson(uResponse);
      const url = json.urls.raw;
      if (url) {
        picture.link = json.links.html || "";
        picture.location = this._createLocation(
          json.location.city,
          json.location.country
        );
        await picture.preloadImage(url);
      }
    } catch (err) {
      return Promise.reject(picture);
    }

    //save and return new pic
    if (picture.isSet()) {
      try {
        await StorageData.put(STORAGE_KEY, picture);
        return picture;
      } catch (err) {
        console.error(err);
        return Promise.reject(picture);
      }
    }
  }

  /**
   * @returns {string}
   * @private
   */
  _getApiKey() {
    return process.env.VUE_APP_UNSPLASH_API_KEY || "";
  }

  /**
   * @returns {boolean} Should the picture be _updated?
   * @private
   */
  _shouldUpdate() {
    if (this._unsplash !== null && this._updated) {
      const t = this._updated + REFRESH_INTERVAL * 60 * 1000;
      if (Date.now() >= t) {
        return true;
      }
    }

    return false;
  }

  /**
   * @param {string|null} city
   * @param {string|null} country
   * @returns {string} Empty string if no city and country
   * @private
   */
  _createLocation(city, country) {
    const arr = [];

    if (city) {
      arr.push(city);
    }
    if (country) {
      arr.push(country);
    }

    return arr.length ? arr.join(", ") : "";
  }
}

export default Bg;
