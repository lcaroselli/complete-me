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
    const node = new Node();

    if(!this.root) {
      this.root = node;
    }

    [...string].forEach((el) => {
      if(!this.root.children[el]) {
        this.root.children[el] = new Node();
        this.root.children[el].letter = [el];
        this.root = this.root.children[el];
      }
    })
    console.log(JSON.stringify(this.root, null, 4));
  }

  // insert(data) {
  //   const node = new Node()
  //
  //   if (!this.root) {
  //     this.root = node;
  //   }
  //
  //   let letters = [...data];
  //   let currentNode = this.root;
  //
  //   for(let i = 0; i < letters.length; i++) {
  //     currentNode.children[letters[i]] = new Node();
  //     currentNode.children[letters[i]].letter = letters[i];
  //     currentNode = currentNode.children[letters[i]];
  //   }
  //   console.log(JSON.stringify(this.root, null, 4));
  // }

};
