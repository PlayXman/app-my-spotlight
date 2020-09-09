import Settings from "./Settings";

/** @type {string} */
const STORE_KEY = "quickLinks";

class QuickLinksSettings extends Settings {
  /**
   * @returns {Promise<{}|null>} Null if nothing found
   */
  static async getSettings() {
    try {
      const quickLinks = await this._loadStoredData(STORE_KEY);
      return quickLinks.data;
    } catch (err) {
      return null;
    }
  }

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

  static quickLink(enabled, url) {
    return {
      enabled,
      url
    };
  }
}

export default QuickLinksSettings;
