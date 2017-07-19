import Node from './Node.js';

export default class Trie {
  constructor(root) {
    this.root = new Node();
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
        currentNode.children[el].letter = [el];
      }
      currentNode = currentNode.children[el];
    })
  }

  count() {
    //count the number of inserted words
  }

  suggest(input) {
    //suggests words based on the user input
    // EXAMPLE : completion.suggest("piz")
    //    RETURNS  => ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]
  }

  populate(dictionary) {
    //populates with dictionary
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




//PHASE 3
// "train” the completion dictionary over time based on the user’s actual selections. So, if a user consistently selects “pizza” in response to completions for “pizz”, it probably makes sense to recommend that as their first suggestion.
//
// Your library should support a select method which takes a substring and the selected suggestion. You will need to record this selection in your trie and use it to influence future selections to make.
//
// Here’s what that interaction model should look like:
//
//
// const CompleteMe = require ("./lib/complete_me")
// const text       = "/usr/share/dict/words"
//
// var completion = new CompleteMe
//
// let dictionary = fs.readFileSync(text).toString().trim().split('\n')
//
// completion.populate(dictionary)
//
// completion.suggest("piz")
// => ["pize", "pizza", "pizzeria", "pizzicato", "pizzle", ...]
//
// completion.select(pizzeria")
//
// completion.suggest("piz")
// => ["pizzeria", "pize", "pizza", "pizzicato", "pizzle", ...]
