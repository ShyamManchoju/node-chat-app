var moment = require('moment');
//var date = moment();
//var formatedCurrentDate = date.format('Do MMM YYYY, hh:mm:ss');

var generateMessage = (from, messageText)=> {
return {
    from, 
    messageText, 
    createdAt: new Date().getDate()
  };
};
var generateLocationMessage = (from, latitude, longitude)=> {
    return { 
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getDate()
     };
    };
module.exports = {generateMessage, generateLocationMessage};