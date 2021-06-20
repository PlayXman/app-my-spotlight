import StorageData from "./storage/StorageData";

/** @type {string} */
const STORAGE_KEY_FIRST_START = "app-firstStart";

class Application {
  /**
   * Has the app started for the first time?
   * @returns {Promise<boolean>}
   */
  static async isFirstStart() {
    try {
      const storeObj = await StorageData.get(STORAGE_KEY_FIRST_START);
      return storeObj.data ?? true;
    } catch (err) {
      return true;
    }
  }

  /**
   * Stores the info the app has been turned on at least once
   * @returns {Promise<void>}
   */
  static async setNotFirstStart() {
    await StorageData.put(STORAGE_KEY_FIRST_START, false);
  }
}

export default Application;
