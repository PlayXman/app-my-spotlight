import Settings from "./Settings";

/** @type {string} */
const STORE_KEY = "quickLinks";

class QuickLinksSettings extends Settings {
  /**
   * @returns {Promise<{mail: {enabled: boolean, url: string}, calendar: {enabled: boolean, url: string}, disk: {enabled: boolean, url: string}, notes: {enabled: boolean, url: string}} | null>} Null if nothing found
   */
  static async getSettings() {
    try {
      const quickLinks = await this._loadStoredData(STORE_KEY);
      return quickLinks.data;
    } catch (err) {
      return null;
    }
  }

  /**
   * @param {{enabled: boolean, url: string}} mail
   * @param {{enabled: boolean, url: string}} calendar
   * @param {{enabled: boolean, url: string}} disk
   * @param {{enabled: boolean, url: string}} notes
   * @returns {Promise<void>}
   */
  static async handleDataChange(mail, calendar, disk, notes) {
    try {
      const data = {
        mail,
        calendar,
        disk,
        notes
      };
      await this._saveDataToStore(STORE_KEY, data);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    } finally {
      this.dispatchUpdate();
    }
  }

  /**
   * Create new instance of quick link object
   * @param {boolean} enabled
   * @param {string} url
   * @returns {{enabled: boolean, url: string}}
   */
  static quickLink(enabled, url) {
    return {
      enabled,
      url
    };
  }
}

export default QuickLinksSettings;
