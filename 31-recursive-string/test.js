var assert = require('chai').assert;
var app = require('./app');
describe('App', () => {

  it('permutates single a', () => {

    let expectedSet = new Set();
    expectedSet.add("a");

    let actualSet = app.permutations("a");
    assert.equal(1, actualSet.size);

    for (let expectedItem of expectedSet) {
      assert(actualSet.has(expectedItem), `set did not contain ${expectedItem}`)
    }
  });

  it('permutates ab', () => {

    let expectedSet = new Set();
    expectedSet.add("ab");
    expectedSet.add("ba");

    let actualSet = app.permutations("ab");

    for (let expectedItem of expectedSet) {
      assert(actualSet.has(expectedItem), `set did not contain ${expectedItem}`)
    }
  });

  it('permutates abc', () => {

    let expectedSet = new Set();

    expectedSet.add("abc");
    expectedSet.add("acb");
    expectedSet.add("bac");
    expectedSet.add("bca");
    expectedSet.add("cab");
    expectedSet.add("cba");

    let actualSet = app.permutations("abc");

    for (let expectedItem of expectedSet) {
      assert(actualSet.has(expectedItem), `set did not contain ${expectedItem}`)
    }
  });

  it('permutates abcd', () => {
    let actualSet = app.permutations("abcd");
    assert.equal(actualSet.size, 24);
  });

  it('permutates abcde', () => {
    let actualSet = app.permutations("abcde");
    assert.equal(actualSet.size, 120);
  });
  it('switches chars', () => {

    assert.equal("abc", app.switchChars("cba", 0, 2));
    assert.equal("abcd", app.switchChars("bacd", 0, 1));
  });

  it('inserts chars', () => {
    let str = "abc";
    assert.equal(app.insertCharAt(str, 0, 'x'), "xabc");
    assert.equal(app.insertCharAt(str, 1, 'x'), "axbc");
    assert.equal(app.insertCharAt(str, 2, 'x'), "abxc");
    assert.equal(app.insertCharAt(str, 3, 'x'), "abcx");
  });

});
