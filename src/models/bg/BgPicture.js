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

class BgPicture {
  constructor() {
    /** @type {null|Blob} @private */
    this._urlBlob = null;
    /** @type {string} */
    this.location = "";
    /** @type {string} */
    this.link = "";
  }

  /**
   * @param {Blob} imgBlob
   */
  set url(imgBlob) {
    this._urlBlob = imgBlob;
  }

  /**
   * @returns {string}
   */
  get url() {
    return this._urlBlob ? URL.createObjectURL(this._urlBlob) : "";
  }

  /**
   * @returns {boolean} True if contains picture data
   */
  isSet() {
    return !!this.link;
  }

  /**
   * Caches the image
   * @param {string} imgUrl
   * @returns {Promise<BgPicture>}
   */
  async preloadImage(imgUrl) {
    const params = new URLSearchParams(FORMAT_SETTINGS);
    const formattedImgUrl = imgUrl + "&" + params.toString();
    const response = await fetch(formattedImgUrl);
    this._urlBlob = await response.blob();

    return this;
  }
}

export default BgPicture;
