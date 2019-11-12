var assert = require('assert');
describe('Sample Test', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    it('should return 0 when the value is in the first position', function(){
      assert.equal(0, [1,2,3].indexOf(1));
    });
  });
});
