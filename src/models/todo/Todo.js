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
    const diff =
      now.getDay() -
      date.getDay() +
      now.getFullYear() -
      date.getFullYear() +
      now.getMonth() -
      date.getMonth();

    if (diff === 0) {
      d = "today";
    } else if (diff === 1) {
      d = "yesterday";
    } else {
      d = `${date.getDay()}.${date.getMonth() + 1}.`;
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
