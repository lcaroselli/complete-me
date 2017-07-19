import Node from './Node.js';

export default class Trie {
  constructor(root) {
    this.root = new Node();
    this.wordCount = 0;
  };

  insert(string) {
    let currentNode = this.root;
    let input = [...string.toLowerCase()];

    if(!currentNode) {
      currentNode = new Node();
    }

    input.forEach((el) => {
      if(!currentNode.children[el]) {
        currentNode.children[el] = new Node(el);
      }
      currentNode = currentNode.children[el]; //!!!! ASK NICK --
    })

    if(!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++
    }
  }

  //Insert takes a string (full letter) and then breaks that word down into an array
  //for each individual element in that array (or letter) we want to start at the root node and build children nodes off of those individual letters
  //if that child doesn't exist, then make a node for that child letter


  count() {
    return this.wordCount;
  }

  suggest(input) {
    let suggestions = [];

    //if the input matches data in our suggestions array...
    //then return that array to the user

    //deconstruct to traverse the tree

    //everytime you hit the end of a word you add that to the suggestions array

    // EXAMPLE : completion.suggest("piz")
    //    RETURNS  => ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]

    //everytime suggest is triggered, UI 'Did you mean ' + suggestion array to DOM
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select(substring) {
    // completion.suggest("piz")
    // => ["pize", "pizza", "pizzeria", "pizzicato", "pizzle", ...]
    //
    // completion.select(pizzeria")
    //
    // completion.suggest("piz")
    // => ["pizzeria", "pize", "pizza", "pizzicato", "pizzle", ...]
  }
}
