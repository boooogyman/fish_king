export class Storage {
  constructor() {}

  static get(key) {
    return localStorage.getItem(key)
  }

  static set(key, value) {
    localStorage.setItem(key, value)
  }
}