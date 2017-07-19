export default class Node {
  constructor(letter = null, children = {}) {
    this.letter = letter;
    this.isWord = false;
    this.children = children;
  };
};
