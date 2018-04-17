const chai = require('chai');

const {isRealString} = require('./validation');

const expect = chai.expect;

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(98);
    expect(res).to.be.equal(false);
  });

  it('should reject string with only spaces', () => {
    var res = isRealString('    ');
    expect(res).to.be.equal(false);
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString('D');
    expect(res).to.be.equal(true);
  });
});
