export default class Node {
  constructor(letter = null, children = {}) {
    this.letter = letter;
    this.isWord = false;
    this.children = children;
    this.frequency = 0;
    this.timeStamp = 0;
  };
};
