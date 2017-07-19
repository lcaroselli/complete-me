import Node from './Node.js';

export default class Trie {
  constructor(root) {
    this.root = new Node();
    this.wordCount = 0;
  };

  insert(string) {
    let currentNode = this.root;
    let input = [...string.toLowerCase()];

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

  suggest(string) {
    let word = [...string.toLowerCase()];
    let currentNode = this.root;
    let suggestions = [];

    word.forEach((letter) => {
      currentNode = currentNode.children[letter];
    });

    const findSuggestions = (string, currentNode) => {

      let keys = Object.keys(currentNode.children);

      keys.forEach((key) => {
        const child = currentNode.children[key];

        let newString = string + child.letter;

        if (child.isWord) {
          suggestions.push({name: newString, frequency: child.frequency, timeStamp: child.timeStamp});
        }
        findSuggestions(newString, child);
      });
    };

    if (currentNode && currentNode.isWord) {
      suggestions.push({name: string, frequency: currentNode.frequency, timeStamp: currentNode.timeStamp})
    }

    if (currentNode) {
      findSuggestions(string, currentNode);
    }

    suggestions.sort((a, b) => {
      return b.frequency - a.frequency || b.timeStamp - a.timeStamp;
    })

    return suggestions.map((obj) => {
      return obj.name;
    })
  }

  select(string) {
    let word = [...string.toLowerCase()];
    let currentNode = this.root;

    word.forEach((letter) => {
      currentNode = currentNode.children[letter];
    });

    currentNode.frequency++;
    currentNode.timeStamp = Date.now();
  }

  count() {
    return this.wordCount;
  }

  populate(dictionary) {
  dictionary.forEach(word => {
    this.insert(word);
    })
  }
};
