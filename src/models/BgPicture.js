import { storage } from "./Settings";
import Unsplash from "unsplash-js";
import { toJson } from "unsplash-js/lib/unsplash";

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

const REFRESH_INTERVAL = 30;

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
  }

  /**
   * @returns {boolean}
   */
  isSetCorrectly() {
    return this._unsplash !== null;
  }

  /**
   * @returns {string} Last downloaded image
   */
  getLastImage() {
    return this._getLastPic();
  }

  /**
   * @returns {Promise<String, String>} Last pic url if rejected
   */
  getImage() {
    return new Promise((resolve, reject) => {
      if (this._shouldUpdate()) {
        this._unsplash.photos
          .getRandomPhoto(PHOTO_CATEGORY_PARAMS)
          .then(toJson)
          .then(json => {
            const url = json.urls.raw;
            if (url) {
              this._saveNewPic(url);
              this._preloadImage(this._formatPic(url), formattedUrl => {
                resolve(formattedUrl);
              });
            }
          })
          .catch(() => {
            reject(this._getLastPic());
          });
      } else {
        resolve(this._getLastPic());
      }
    });
  }

  /**
   * @returns {string}
   * @private
   */
  _getApiKey() {
    return process.env.VUE_APP_UNSPLASH_API_KEY || "";
  }

  /**
   * @returns {boolean} Should the picture be updated?
   * @private
   */
  _shouldUpdate() {
    const timestamp =
      localStorage.getItem(storage.unsplash.updateTimestamp.key) || 1;

    if (timestamp) {
      const t = Number(timestamp) + REFRESH_INTERVAL * 60 * 1000;
      if (Date.now() >= t) {
        return true;
      }
    }

    return false;
  }

  /**
   * Cache
   * @returns {string} Last downloaded pic url
   * @private
   */
  _getLastPic() {
    const pic = localStorage.getItem(storage.unsplash.picture.key);

    if (!pic) {
      return "";
    }

    return this._formatPic(pic);
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
   * @param {string} picUrl Raw url
   * @private
   */
  _saveNewPic(picUrl) {
    localStorage.setItem(storage.unsplash.picture.key, picUrl);
    localStorage.setItem(
      storage.unsplash.updateTimestamp.key,
      String(Date.now())
    );
  }

  /**
   * @param {string} imgUrl
   * @param {function(string)} cb Returns image's url
   * @private
   */
  _preloadImage(imgUrl, cb) {
    const img = new Image();
    img.src = imgUrl;

    img.addEventListener("load", () => {
      cb(imgUrl);
    });
  }
}

export default BgPicture;
