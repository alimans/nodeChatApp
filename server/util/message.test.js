const chai = require('chai');

const { generateMessage } = require('./message');

const expect = chai.expect;

describe('generatMessage function in util/message module', () => {
    it('should return back an object', () => {
        var obj = generateMessage('ali', 'salam');
        
        expect(obj).to.include({
            from: "ali",
            text: "salam"
        });
        expect(obj.createdAt).to.be.a('number');
    });
});

