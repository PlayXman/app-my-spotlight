import { DATA_STORE_NAME } from "../StorageData";

/**
 * @param {IDBTransaction} transaction
 */
export function updateWeatherDataWithNewApi(transaction) {
  return new Promise((resolve, reject) => {
    const store = transaction.objectStore(DATA_STORE_NAME);

    const request = store.delete("weather");

    request.onerror = function(e) {
      reject(e.target.error);
    };
    request.onsuccess = function() {
      resolve();
    };
  });
}
