var assert = require('chai').assert;
var app = require('./app');

describe('App', () => {
    it('says hello', () => {
      let appInst = new app.App();
      assert.equal("hello", appInst.hello());
    });
});

describe('Queue', () => {
  describe('#indexOf()', () => {
    it('should return in order', () => {

      let queue = new app.Queue();
      queue.enqueue("one");
      queue.enqueue("two");
      queue.enqueue("three");

      assert.equal(queue.dequeue(), "one");
      assert.equal(queue.dequeue(), "two");
      assert.equal(queue.dequeue(), "three");

    });
  });
});
