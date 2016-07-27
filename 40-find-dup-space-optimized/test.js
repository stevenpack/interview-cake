'use strict';
var assert = require('chai').assert;
var app = require('./app');
describe('App', () => {
  it('finds dupes', () => {

    let arr = [0,1,1,2,2,2,2,3];
    assert.isTrue(arraysEqual(app.findDupes(arr), [1,2]), "expected arrays to be equal");

  });

  it('finds dupes optimzed', () => {

    let arr = [0,1,1,2,2,2,2,3];
    assert.isTrue(arraysEqual(app.findDupesOpt(arr), [1,2]), "expected arrays to be equal");

  });

  it('finds dupes super optimzed', () => {

    let arr = [1,2,3,4,1];
    assert.equal(app.findFirstDupeNonDestructive(arr), 1, "expected to find 1");
    assert.equal(app.findFirstDupeNonDestructive([1,2,1]), 1, "expected to find 1");
    assert.equal(app.findFirstDupeNonDestructive([2,2,1,3,4,5,6]), 2, "expected to find 2");
    assert.equal(app.findFirstDupeNonDestructive([2,1,1]), 1, "expected to find 1");
    assert.equal(app.findFirstDupeNonDestructive([1,2,3,4,5,5]), 5, "expected to find 5");
  });

  it('sort', () => {
    let arr = [2,1,3];
    assert.isTrue(arraysEqual(app.sortInPlace(arr), [1,2,3]));
  });
});

function arraysEqual(a1,a2) {
  return JSON.stringify(a1)==JSON.stringify(a2);
}