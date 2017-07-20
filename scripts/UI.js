import Node from './Node';
import Trie from './Trie';
import words from './words';

// Global Variables
const newTree = new Trie();
const suggestionsBox = document.getElementById('suggestions-array');
const suggestionsText = document.getElementById('suggestions');
const userInput = $('#user-input');


//Document Ready State
$(document).ready(populateDictionary);

function populateDictionary() {
  newTree.populate(words);
}


//Events
$(userInput).on('keyup', dropDownSuggestions);


//Functions
function clearDOM() {
  $('button').remove();
  suggestionsText.style.display = "none";
  suggestionsBox.style.display = "none";
}

function dropDownSuggestions() {
  if ($(userInput).val() === '') {
    clearDOM();
  } else {
    filterSuggestions();
  }
}

function filterSuggestions() {
  let string = userInput.val();
  let suggestions = newTree.suggest(string);

  suggestionsText.style.display = "block";
  suggestionsBox.style.display = "block";

  for (let i = 0; i < 10; i++) {
    if(suggestions[i] !== undefined) {
      $('#suggestions-array').prepend(`<p><button>${suggestions[i]}</button></p>`)
    }
  }
}

//when a full word button is pressed, have that word appear in the input and a submit button become non-opaque and un-disabled
