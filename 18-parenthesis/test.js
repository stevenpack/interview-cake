var assert = require('chai').assert;
var app = require('./app');
describe('Parethesis finder', function() {
    it('it goes', function() {
      assert.equal(1, app.hello());
    });

    it('counts right', () => {
        let closingPos = app.findMatching(10, 'Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing');
        assert.equal(closingPos, 79);
    })
});
