import Todoist from "./Todoist";
import TodolistSettings from "../settings/TodolistSettings";

class TodoList {
  constructor() {
    this._todoist = new Todoist();
  }

  /**
   * @returns {Promise<boolean>} Is user token set
   */
  async isActive() {
    return await this._todoist.isActive();
  }

  /**
   * Shows saved items and loads a new ones.
   * @returns {Promise<TodoItem[]>}
   */
  async getItems() {
    const data = await this._todoist.getData();
    const projectIdsToFilter = await this._activeProjectsIds(data.projects);

    return data.items.filter(item => {
      let byProject = true;
      if (projectIdsToFilter !== null && projectIdsToFilter.length) {
        byProject = projectIdsToFilter.includes(item.projectId);
      }

      return item.isDue() && byProject;
    });
  }

  /**
   * @returns {Promise<TodoProject[]>}
   */
  async getProjects() {
    const data = await this._todoist.getData();

    return data.projects;
  }

  /**
   * @param {TodoProject[]} allProjects
   * @returns {number[]|null} Null if no filters are set. Empty if no projects equals to set filters
   * @private
   */
  async _activeProjectsIds(allProjects) {
    const projectNames = await this._projectsToFilter();

    if (!projectNames.length) {
      return null;
    }

    const ids = [];
    allProjects.forEach(project => {
      if (projectNames.includes(project.name)) {
        ids.push(project.id);
      }
    });

    return ids;
  }

  /**
   * @returns {Promise<string[]>} Separated projects from filter
   * @private
   */
  async _projectsToFilter() {
    const settings = await TodolistSettings.getSettings();

    if (settings === null) {
      return [];
    } else if (!settings.filters) {
      return [];
    }

    return settings.filters;
  }
}

export default TodoList;
