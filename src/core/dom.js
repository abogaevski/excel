class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    return this.$el.textContent.trim();
  }

  all(selector) {
    return this.$el.querySelectorAll(selector);
  }

  clear() {
    this.html();
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
    return this;
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((param) => {
          this.$el.style[param] = styles[param];
        });

    return this;
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  addClass( className = '') {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className = '') {
    this.$el.classList.remove(className);
    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  get data() {
    return this.$el.dataset;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  id(parser = false) {
    if (parser) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
