export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error(`$root is not provided in DomListener`);
    }

    this.$root = $root;
  }
}
