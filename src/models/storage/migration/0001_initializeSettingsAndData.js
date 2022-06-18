import { SETTINGS_STORE_NAME } from "../../settings/Settings";
import { DATA_STORE_NAME } from "../StorageData";

/**
 * @param {IDBDatabase} db
 */
export function initializeSettingsAndDataMigration(db) {
  const tables = [
    {
      key: SETTINGS_STORE_NAME,
      keyPath: "category"
    },
    {
      key: DATA_STORE_NAME,
      keyPath: "type"
    }
  ];

  for (const { key, keyPath } of tables) {
    if (!db.objectStoreNames.contains(key)) {
      db.createObjectStore(key, {
        keyPath: keyPath,
        autoIncrement: false
      });
    }
  }
}
