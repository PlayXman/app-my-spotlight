import TodoItem from "./TodoItem";
import StorageData from "../storage/StorageData";
import TodolistSettings from "../../models/settings/TodolistSettings";
import TodoProject from "../../models/todo/TodoProject";

/** @type {string} */
const API_URL = "https://api.todoist.com/sync/v9/sync";
/** @type {number} In minutes */
const UPDATE_INTERVAL = 2;
/** @type {string} */
const STORAGE_KEY = "todolist";

class Todoist {
  constructor() {
    /** @type {TodoItem[]} */
    this.items = [];
    /** @type {TodoProject[]} */
    this.projects = [];
    /** @type {number} @private */
    this._updated = 0;
  }

  /**
   * @returns {Promise<boolean>} Is user token set.
   */
  async isActive() {
    return (await this._userToken()) !== "";
  }

  /**
   * Loads items from cache and fetches a new ones.
   * @returns {Promise<{items: TodoItem[], projects: TodoProject[]}>}
   */
  async getData() {
    await this._cacheData();

    if (await this._shouldUpdate()) {
      await this._fetchAllData();
    }

    return Promise.resolve({
      items: this.items,
      projects: this.projects
    });
  }

  /**
   * Loads items from storage.
   * @returns {Promise<void>}
   * @private
   */
  async _cacheData() {
    try {
      const data = await StorageData.get(STORAGE_KEY);
      this._updated = data.updated;
      this.items = data.data.items.map(item => {
        const todo = new TodoItem();
        todo.id = item.id;
        todo._text = item._text;
        todo.createDate = item.createDate;
        todo._dueDate = item._dueDate;
        todo.projectId = item.projectId;
        return todo;
      });
      this.projects = data.data.projects.map(project => {
        const p = new TodoProject();
        p.id = project.id;
        p.name = project.name;
        return p;
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.resolve();
    }
  }

  /**
   * @returns {Promise<boolean>} Is allowed to update.
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
  async _fetchAllData() {
    const params = new URLSearchParams({
      sync_token: "*",
      resource_types: '["items", "projects"]'
    });
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", `Bearer ${await this._userToken()}`);

    const items = [];
    const projects = [];

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: params
      });
      /**
       * @type {{
       *   items: {
       *     due?: {
       *       date: string;
       *     };
       *     id?: number;
       *     content?: string;
       *     date_added?: string;
       *     project_id?: number;
       *   }[];
       *   projects: {
       *     id: number;
       *     name: string;
       *   }[];
       * }}
       */
      const data = await response.json();

      data.items.forEach(item => {
        if (item.due) {
          const todo = new TodoItem();
          todo.id = item.id;
          todo.text = item.content;
          todo.createDate = item.date_added; // date in ISO format (e.g. "2022-06-11T09:11:20Z")
          todo.dueDate = item.due.date; // date in date-only string (e.g. "2022-06-11")
          todo.projectId = item.project_id;

          items.push(todo);
        }
      });

      data.projects.forEach(project => {
        const p = new TodoProject();
        p.id = project.id;
        p.name = project.name;
        projects.push(p);
      });
    } catch (err) {
      console.error(err);
      return [];
    }

    this.items = items;
    this.projects = projects;
    try {
      await this._save();
    } catch (err) {
      console.error(err);
    }

    return this.items;
  }

  /**
   * @returns {Promise<void, string>}
   * @private
   */
  async _save() {
    return StorageData.put(STORAGE_KEY, {
      items: this.items,
      projects: this.projects
    });
  }

  /**
   * @returns {Promise<string>} Saved user's api token.
   * @private
   */
  async _userToken() {
    const settings = await TodolistSettings.getSettings();
    return settings?.apiKey || "";
  }
}

export default Todoist;
