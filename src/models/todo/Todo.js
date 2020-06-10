class Todo {
  id;
  text;
  createDate;
  _dueDate;

  /**
   * @param {string} date
   */
  set dueDate(date) {
    this._dueDate = date;
  }

  /**
   * @returns {string} "today", "yesterday", date for others
   */
  get dueDate() {
    const date = new Date(this._dueDate);
    const now = new Date();

    let d = "";
    let diff = now.getFullYear() - date.getFullYear();
    diff += now.getMonth() - date.getMonth();
    diff *= 10;
    diff += now.getDate() - date.getDate();

    if (diff === 0) {
      d = "today";
    } else if (diff === 1) {
      d = "yesterday";
    } else {
      d = `${date.getDate()}.${date.getMonth() + 1}.`;
    }

    return d;
  }

  /**
   * @returns {boolean} True for past and today date
   */
  isDue() {
    const now = new Date();
    const date = new Date(this._dueDate);

    return now >= date;
  }
}

export default Todo;
