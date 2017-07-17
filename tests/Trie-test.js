import { expect } from 'chai';
import Node from '../Node';
import List from '../Trie.js';
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie functionality', () => {
  let completeMe = new Trie(); //completeMe is your data structure
                              //completeMe.root is a node (the first node)

  beforeEach(function() {
    let completeMe;
  });

  it('should have a root', () => {
    expect(completeMe.root).to.equal(null);
  });

  it('should be able to insert a word and root should be a Node', () => {
    completeMe.insert('apple');

    expect(completeMe.root).to.be.instanceOf(Node);
  });

  it('should be able to insert a word and root should have children', () => {
    completeMe.insert('apple');

    // expect(completeMe.root.children.a.letter).to.be.equal('a');
    expect(
      completeMe.root.children
      .a.children
      .p.children
      .p.children
      .l.children
      .e.letter).to.equal('e');

    expect(
      completeMe.root.children
      .a.children
      .p.children
      .p.children
      .l.children
      .e.letter).isWord(true);
  });

  it ('should be able to insert multiple words and children should have multiple properties', () => {
    completeMe.insert('apple');
    completeMe.insert('ape');

    let childKeys = Object.keys(
      completeMe.root
      .a.children
      .p.children
      .children
    )

    expect(childKeys).to.deep.equal(['e', 'p'])

    expect(
      completeMe.root
      .a.children
      .p.children
      .p.children
      .l.children
      .e.letter)
  });

  it('should be able to insert a word and the last letter should have a isWord property of true', () => {

  })

  it('should have nodes the represent incomplete words where the isWord property is false', () => {

  })

  it('should return number of words inserted', () => {
    expect(completeMe.count()).to.equal(0);

    completeMe.insert('ape');
    expect(completeMe.count()).to.equal(1);

    completeMe.insert('app');
    expect(completeMe.count()).to.equal(2);

    completeMe.insert('apple');
    expect(completeMe.count()).to.equal(3);

    completeMe.insert('apples');
    expect(completeMe.count()).to.equal(4);
  })

  it('should return all children words of suggestion', () => {
    completeMe.insert('apple');
    completeMe.insert('applesauce');
    completeMe.insert('apply');
    completeMe.insert('apt');
    completeMe.insert('cat');

    let suggestions = completeMe.suggest('app'); //suggest returns an array of complete words that match the user input

    expect(suggestions).to.deep.equal(['apple', 'applesauce', 'apply']);
  })

  it('should be able to select order of words returned by suggest', () => {
    completeMe.insert('app');
    completeMe.insert('apple');
    completeMe.insert('applesauce');
    completeMe.insert('apply');

    let suggestions = completeMe.suggest('app');

    expect(suggestions).to.deep.equal(['app', 'apple', 'applesauce', 'apply']);

    completeMe.select('apply');

    expect(suggestions).to.deep.equal(['appply', 'app', 'apple', 'applesauce']);
  })

});
