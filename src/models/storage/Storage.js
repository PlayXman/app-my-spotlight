const DB_NAME = "appDb";
const DB_VERSION = 1;

/** @type {Map<string, {}>} Storages' configurations */
const onDbUpdateItems = new Map();

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
   * Define new store to be registered when db version is updated
   * @param {string} storeName
   * @param {string} keyPath
   * @param {boolean} autoIncrement
   * @param {string[]} indexes
   * @returns {Db}
   */
  updateDb(storeName, keyPath = "", autoIncrement = false, indexes = []) {
    onDbUpdateItems.set(storeName, {
      keyPath,
      autoIncrement,
      indexes
    });
    return this;
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
   * @param {number | string | Date | BufferSource | IDBArrayKey} key
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
   * @param {number | string | Date | BufferSource | IDBArrayKey} key
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
  _onUpgradeNeeded(e) {
    const db = e.target.result;

    onDbUpdateItems.forEach((data, key) => {
      if (!db.objectStoreNames.contains(key)) {
        const store = db.createObjectStore(key, {
          keyPath: data.keyPath,
          autoIncrement: data.autoIncrement
        });

        data.indexes.forEach(index => {
          store.createIndex(index, index, { unique: false });
        });
      }
    });
  }
}

/**
 * @returns {Db}
 */
export default function() {
  return new Db();
}
