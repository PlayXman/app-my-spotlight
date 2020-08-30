import Todo from "./Todo";
import { storage } from "../Settings";

/** @type {string} */
const API_URL = "https://api.todoist.com/sync/v8/sync";
/** @type {number} In minutes */
const UPDATE_INTERVAL = 2;

class Todoist {
  items = [];

  /**
   * @returns {boolean} Is user token set
   */
  isActive() {
    return this._userToken() !== "";
  }

  /**
   * @returns {boolean} Is allowed to update
   */
  canUpdate() {
    const lastUpdate =
      Number(localStorage.getItem(storage.todoist.updateTimestamp.key)) +
      UPDATE_INTERVAL * 1000 * 60;

    return this.isActive() && lastUpdate < new Date().getTime();
  }

  /**
   * Shows saved items and loads a new ones.
   * @returns {[]} Items
   */
  getItems() {
    if (this.canUpdate()) {
      this._fetchAllItems();
    }

    return this._loadItemsFromStorage();
  }

  /**
   * Loads items from storage.
   * @returns {[]}
   * @private
   */
  _loadItemsFromStorage() {
    const storageData = localStorage.getItem(storage.todoist.items.key) || "[]";
    const data = JSON.parse(storageData).map(item => {
      const todo = new Todo();
      todo.id = item.id;
      todo.text = item._text;
      todo.createDate = item.createDate;
      todo.dueDate = item._dueDate;

      return todo;
    });

    this.items = data;
    return data;
  }

  /**
   * Downloads new items from Todoist and saves them.
   * @returns {Promise<[], void>}
   * @private
   */
  _fetchAllItems() {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        token: this._userToken(),
        sync_token: "*",
        resource_types: '["items"]'
      });

      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: params
      })
        .then(response => response.json())
        .then(data => {
          const items = [];

          data.items.forEach(item => {
            if (item.due) {
              const todo = new Todo();
              todo.id = item.id;
              todo.text = item.content;
              todo.createDate = item.date_added;
              todo.dueDate = item.due.date;

              items.push(todo);
            }
          });

          this.items = items;
          this._saveItems();

          resolve(this.items);
        })
        .catch(error => {
          console.error(error);
          reject();
        });
    });
  }

  /**
   * @private
   */
  _saveItems() {
    localStorage.setItem(storage.todoist.items.key, JSON.stringify(this.items));
    localStorage.setItem(
      storage.todoist.updateTimestamp.key,
      String(new Date().getTime())
    );
  }

  /**
   * @returns {string} Saved user api token
   * @private
   */
  _userToken() {
    return localStorage.getItem(storage.todoist.userToken.key) || "";
  }
}

export default Todoist;
