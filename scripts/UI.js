import Node from './Node';
import Trie from './Trie';
import words from './words';

// Global Variables
const newTree = new Trie();
const submitButton = document.getElementById('submit-button');
const submissionBox = document.getElementById('submitted-words');
const submittedText = document.getElementById('submissions');
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
$(suggestionsBox).on('click', '.suggestion-button', selectSuggestion);
$(suggestionsBox).on('click', '.suggestion-button', sortSelected);
$(submitButton).on('click', submittedWordsList);


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
      $('#suggestions-array').prepend(`<p><button class="suggestion-button">${suggestions[i]}</button></p>`);
    }
  }
}

function selectSuggestion(e) {
  let selected = e.target;
  let selectedText = $(selected).text();
  $(userInput).val(selectedText);
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
    this.style.border = "1px solid #1B1B1E";
    this.style.color = "#E63946";
  }
  submitButton.onmouseout = function() {
    this.style.backgroundColor = "#E63946";
    this.style.color = "#F1FAEE";
  }
}

function submittedWordsList() {
  submissionBox.style.display = "block";
  submittedText.style.display = "block";

  $(submissionBox).append(`<p><button class="suggestion-button-2">${userInput.val()}</button></p>`);
}

function sortSelected (e) {
  let selectedWord = e.target.innerHTML;
  newTree.select(selectedWord);
  filterSuggestions();
}
