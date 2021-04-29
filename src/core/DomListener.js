export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`$root is not provided in DomListener`);
    }
    this.listeners = listeners;
    this.$root = $root;
  }

  initDomListeners() {
    console.log(this.listeners);
  }

  removeDomListeners() {

  }
}
