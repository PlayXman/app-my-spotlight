import TodoItem from "./TodoItem";
import StorageData from "../storage/StorageData";
import TodolistSettings from "@/models/settings/TodolistSettings";

/** @type {string} */
const API_URL = "https://api.todoist.com/sync/v8/sync";
/** @type {number} In minutes */
const UPDATE_INTERVAL = 2;
/** @type {string} */
const STORAGE_KEY = "todolist";

class Todoist {
  constructor() {
    /** @type {TodoItem[]} */
    this.items = [];
    /** @type {number} @private */
    this._updated = 0;
  }

  /**
   * @returns {Promise<boolean>} Is user token set
   */
  async isActive() {
    return (await this._userToken()) !== "";
  }

  /**
   * Shows saved items and loads a new ones.
   * @returns {Promise<TodoItem[]>}
   */
  async getItems() {
    const cachedItems = await this._loadCachedItems();

    if (await this._shouldUpdate()) {
      return await this._fetchAllItems();
    }

    return cachedItems;
  }

  /**
   * Loads items from storage.
   * @returns {Promise<TodoItem[]>}
   * @private
   */
  async _loadCachedItems() {
    try {
      const data = await StorageData.get(STORAGE_KEY);
      this._updated = data.updated;
      this.items = data.data.map(item => {
        const todo = new TodoItem();
        todo.id = item.id;
        todo._text = item._text;
        todo.createDate = item.createDate;
        todo._dueDate = item._dueDate;
        return todo;
      });
      return this.items;
    } catch (err) {
      return [];
    }
  }

  /**
   * @returns {Promise<boolean>} Is allowed to update
   * @private
   */
  async _shouldUpdate() {
    const lastUpdate = this._updated + UPDATE_INTERVAL * 1000 * 60;

    return (await this.isActive()) && lastUpdate < new Date().getTime();
  }

  /**
   * Downloads new items from Todoist and saves them.
   * @returns {Promise<TodoItem[]>}
   * @private
   */
  async _fetchAllItems() {
    const params = new URLSearchParams({
      token: await this._userToken(),
      sync_token: "*",
      resource_types: '["items"]'
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const items = [];

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: params
      });
      const data = await response.json();

      data.items.forEach(item => {
        if (item.due) {
          const todo = new TodoItem();
          todo.id = item.id;
          todo.text = item.content;
          todo.createDate = item.date_added;
          todo.dueDate = item.due.date;

          items.push(todo);
        }
      });
    } catch (err) {
      console.error(err);
      return [];
    }

    this.items = items;
    try {
      await this._saveItems();
    } catch (err) {
      console.error(err);
    }

    return this.items;
  }

  /**
   * @returns {Promise<void, string>}
   * @private
   */
  async _saveItems() {
    return StorageData.put(STORAGE_KEY, this.items);
  }

  /**
   * @returns {Promise<string>} Saved user's api token
   * @private
   */
  async _userToken() {
    return await TodolistSettings.getApiKey();
  }
}

export default Todoist;
