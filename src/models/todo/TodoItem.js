class TodoItem {
  /** @type {number} */
  id;
  /** @type {string} @private */
  _text;
  /** @type {string} */
  createDate;
  /** @type {string} @private */
  _dueDate;

  /**
   * @param {string} text
   */
  set text(text) {
    this._text = text;
  }

  /**
   * @returns {string}
   */
  get text() {
    let text = this._text;
    text = text.replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, "$1");

    let m;
    let lastIndex = 0;
    let newText = "";
    const regex = /https?:\/\/([^\s]+)/g;
    while ((m = regex.exec(text)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      newText += text.slice(lastIndex, m.index);
      newText += m[1].substr(0, 15) + "...";

      lastIndex = regex.lastIndex;
    }

    if (newText.length) {
      text = newText;
    }

    return text;
  }

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

export default TodoItem;
