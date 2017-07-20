import Node from './Node';
import Trie from './Trie';
import words from './words';

// Global Variables
const newTree = new Trie();
const submitButton = document.getElementById('submit-button');
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
  $('.suggestion-button').remove();
  submitButtonDefault();
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
  submitButtonStyle();

  for (let i = 0; i < 10; i++) {
    if(suggestions[i] !== undefined) {
      $('#suggestions-array').prepend(`<p><button class="suggestion-button">${suggestions[i]}</button></p>`)
    }
  }
}

function submitButtonDefault() {
  submitButton.style.opacity = "0.3";
  submitButton.onmouseover = function() {
    this.style.backgroundColor = "#E63946";
    this.style.color = "#F1FAEE";
    this.style.cursor = "default";
  }
}

function submitButtonStyle() {
  submitButton.style.opacity = "1";
  submitButton.style.cursor = "pointer";
  submitButton.onmouseover = function() {
    this.style.backgroundColor = "#F1FAEE";
    this.style.border = "1px solid #1B1B1E"
    this.style.color = "#E63946";
  }
  submitButton.onmouseout = function() {
    this.style.backgroundColor = "#E63946";
    this.style.color = "#F1FAEE";
  }
}

//when a full word button is pressed, have that word appear in the input and a submit button become non-opaque and un-disabled


function selectWord(e) {
  let selected = e.target.innerHTML;
  searchTrie.select(selected);
  filterList();
}

$('aside').on('click', '.suggestions', selectWord);
