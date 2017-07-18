import Node from './Node.js';

export default class Trie {
  constructor(root) {
    if (this.root === undefined) {
      this.root = null
    } else {
      this.root = new Node();
    }
  };

  insert(string) {
    [...string].forEach((el) => {
      if(!this.root.children[el]) {
        this.root.children[el] = new Node(el);
      }
    })
  }
};
