import { initializeSettingsAndDataMigration } from "./migration/0001_initializeSettingsAndData";
import { updateWeatherDataWithNewApi } from "./migration/0002_updateWeatherDataWithNewApi";

const DB_NAME = "appDb";
/**
 * Should correspond with number of migration scripts.
 *
 * ## How to update
 * 1. Create migration script in /src/models/storage/migration.
 * 2. Add the migration script to array in DB._onUpgradeNeeded.
 *
 * @type {number} Current IndexedDB version.
 */
const DB_VERSION = 2;

/**
 * IndexedDB wrapper
 */
class Db {
  constructor() {
    /** @type {string} */
    this.name = DB_NAME;
    /** @type {number} */
    this.version = DB_VERSION;
    /** @type {string} */
    this.storeName = "";
  }

  /**
   * @param {string} storeName
   * @returns {Db}
   */
  store(storeName) {
    this.storeName = storeName;
    return this;
  }

  /**
   * @param {IDBValidKey | IDBKeyRange} key
   * @returns {Promise<{}, string>} Data from db
   */
  get(key) {
    return this._run((db, resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.get(key);

      request.onerror = function(e) {
        reject(e.target.error);
      };
      request.onsuccess = function(e) {
        resolve(e.target.result);
      };
    });
  }

  /**
   * @param {{}} obj Data saved in db
   * @returns {Promise<void, string>}
   */
  put(obj) {
    return this._run((db, resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(obj);

      request.onerror = function(e) {
        reject(e.target.error);
      };
      request.onsuccess = function() {
        resolve();
      };
    });
  }

  /**
   * @param {IDBValidKey | IDBKeyRange} key
   * @returns {Promise<void, string>}
   */
  delete(key) {
    return this._run((db, resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(key);

      request.onerror = function(e) {
        reject(e.target.error);
      };
      request.onsuccess = function() {
        resolve();
      };
    });
  }

  /**
   * @param {function(IDBDatabase, function, function)} onSuccess
   * @returns {Promise<*, string>}
   * @private
   */
  _run(onSuccess) {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(this.name, this.version);

      openRequest.onupgradeneeded = this._onUpgradeNeeded;
      openRequest.onsuccess = e => {
        onSuccess(e.target.result, resolve, reject);
      };
      openRequest.onerror = e => {
        reject(e.target.error);
      };
    });
  }

  /**
   * @param {IDBVersionChangeEvent} e
   * @private
   */
  async _onUpgradeNeeded(e) {
    /** @type {IDBDatabase} */
    const db = e.target.result;
    const { oldVersion, newVersion } = e;

    if (oldVersion >= newVersion) {
      return;
    }

    console.log(
      `STORAGE: Update storage from v${oldVersion} to v${newVersion}`
    );

    /**
     * Migration scripts. Must correspond with DB versions.
     *
     * The index of the migration script equals to IndexedDB version for which is the migration intended minus 1. If you need to skip one version create empty migration script and add it to the array.
     *
     * @type {((function(): void)|(function(): Promise<unknown>))[]}
     */
    const migrations = [
      () => initializeSettingsAndDataMigration(db),
      () => updateWeatherDataWithNewApi(e.target.transaction)
    ];

    for (let v = oldVersion; v < newVersion; v++) {
      const migration = migrations[v];
      if (migration) {
        try {
          await migration();
        } catch (e) {
          console.error("STORAGE: Version update failed", e);
          break;
        }
      }
    }
  }
}

/**
 * @returns {Db}
 */
export default function() {
  return new Db();
}
