import Unsplash from "unsplash-js";
import { toJson } from "unsplash-js/lib/unsplash";
import StorageData from "./storage/StorageData";

/** @link https://unsplash.com/documentation#supported-parameters */
const FORMAT_SETTINGS = {
  w: "1920",
  h: "1080",
  q: "80",
  crop: "entropy",
  fm: "jpg",
  fit: "crop",
  dpr: "1"
};
/** @link https://unsplash.com/documentation#get-a-random-photo */
const PHOTO_CATEGORY_PARAMS = {
  query: "landscape",
  orientation: "landscape"
};
/** @type {number} */
const REFRESH_INTERVAL = 30;
/** @type {string} */
const STORAGE_KEY = "bgPicture";

class BgPicture {
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

  /**
   * Cache
   * @returns {Promise<string, string>} Last downloaded pic url
   */
  async getLastPic() {
    try {
      const pic = await StorageData.get(STORAGE_KEY);
      this._updated = pic.updated;
      return this._blob2url(pic.data);
    } catch (err) {
      return Promise.reject("");
    }
  }

  /**
   * @returns {Promise<String, String>} Last pic url if rejected
   */
  async getImage() {
    let lastPic;
    try {
      lastPic = await this.getLastPic();
    } catch (fallback) {
      lastPic = fallback;
    }

    if (this._unsplash !== null && this._shouldUpdate()) {
      let url;
      try {
        const uResponse = await this._unsplash.photos.getRandomPhoto(
          PHOTO_CATEGORY_PARAMS
        );
        const json = await toJson(uResponse);
        url = json.urls.raw;
      } catch (err) {
        throw new Error(lastPic);
      }

      if (url) {
        try {
          const formattedPic = await this._preloadImage(this._formatPic(url));
          await this._saveNewPic(formattedPic);
          return this._blob2url(formattedPic);
        } catch (err) {
          console.error(err);
          throw new Error(lastPic);
        }
      }
    } else {
      return lastPic;
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
    if (this._updated) {
      const t = this._updated + REFRESH_INTERVAL * 60 * 1000;
      if (Date.now() >= t) {
        return true;
      }
    }

    return false;
  }

  /**
   * @param {string} picUrl Raw url
   * @returns {string} Formatted url for web download
   * @private
   */
  _formatPic(picUrl) {
    const params = new URLSearchParams(FORMAT_SETTINGS);
    params.toString();
    return picUrl + "&" + params.toString();
  }

  /**
   * @param {Blob} picture Raw url
   * @returns {Promise<void, string>}
   * @private
   */
  _saveNewPic(picture) {
    return StorageData.put(STORAGE_KEY, picture);
  }

  /**
   * @param {Blob} blob
   * @returns {string}
   * @private
   */
  _blob2url(blob) {
    return URL.createObjectURL(blob);
  }

  /**
   * @param {string} imgUrl
   * @returns {Promise<Blob>}
   * @private
   */
  _preloadImage(imgUrl) {
    return fetch(imgUrl).then(response => response.blob());
  }
}

export default BgPicture;
