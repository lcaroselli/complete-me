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
      currentNode = currentNode.children[el];
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


  suggest(string) { //you put in a partial string
    let stringArray = [...string];
    let currentNode = this.root;
    let suggestionsArray = [];

    stringArray.forEach((letter) => {
      currentNode = currentNode.children[letter];
    });
    //for each letter, assign currentNode to that letter -- this is how we're getting down to that last letter

    //traversing through the tree to that last letter
    //where you are based on the users word -- currentNode now refers to last leter in our string

    const findSuggestions = (string, currentNode) => {
      //going through tree from the point you designate to find suggestions

      let stringKeys = Object.keys(currentNode.children);

      //wherever we are, I want to find all my children b/c children imply there's a word we can suggest
      stringKeys.forEach((key) => {
        let child = currentNode.children[key];
        let newString = string + child.letter;
          //concatenating as we go along
        if (child.isWord) {
          suggestionsArray.push(newString);
        } //if this is a word, push it into my suggestions array
        findSuggestions(newString, child);
        //recursive part - keeps traversing if it has more children nodes
      })
    };

    if (currentNode && currentNode.isWord) {
      suggestionsArray.push(string);
    } //if we're on a node, and it is a word, push into suggestions

    if (currentNode) {
      findSuggestions(string, currentNode);
    } //if it's just a node but not a word we need to run our traverse the trie function

    return suggestionsArray;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select(word) {
    let wordArray = [...word];
    let currentNode = this.root;

    for(let i = 0; i < wordArray.length; i++) {
      currentNode = currentNode.children[wordArray[i]];
    }
    currentNode.frequency++
  }
};
