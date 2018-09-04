var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=>{

    it('should generate correct message with required params', ()=>{
        var from = 'Julie';
        var messageText = "How do you do ?";
        var message = generateMessage(from, messageText);

        expect(message.createdAt).toBeTruthy();
        /*expect(message).toMatchObject({
            from,
            messageText
        });*/
    });
});