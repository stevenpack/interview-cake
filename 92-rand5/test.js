var assert = require('chai').assert;
let app = new require('./app');
let rand = new app.Rand();

describe('App', () => {
  it('Says hello', () => {
    let appInst = new app.App();
    assert.equal("hello", appInst.hello());
  });
});

describe('Rand', () => {
  it('Has rand7', () => {
    let r7 = rand.rand7();
    assert(r7 > 0);
    assert(r7 < 8);
  });

  it('Has rand5', () => {

    for (let i=0; i < 100; i++) {
      let r5 = rand.rand5();
      console.log(`Got ${r5}`)
      assert.isAbove(r5, 0, "r5 > 0");
      assert.isBelow(r5, 6, "r5 < 6");
    }
  });

});
