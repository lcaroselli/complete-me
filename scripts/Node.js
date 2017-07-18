export default class Node {
  constructor(letter, children = {}) {
    this.letter = letter;
    this.isWord = false;
    this.children = children;
  };
};
