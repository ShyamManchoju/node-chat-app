var generateMessage = (from, messageText)=> {
return {
    from, 
    messageText, 
    createdAt: new Date().getDate() +'-'+ new Date().getMonth() +'-'+ new Date().getFullYear()
     +':'+ new Date().getMinutes() +':'+ new Date().getSeconds() +':'+ new Date().getMilliseconds()
 };
};
var generateLocationMessage = (from, latitude, longitude)=> {
    return { 
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getDate() +'-'+ new Date().getMonth() +'-'+ new Date().getFullYear()
        +':'+ new Date().getMinutes() +':'+ new Date().getSeconds() +':'+ new Date().getMilliseconds()
     };
    };
module.exports = {generateMessage, generateLocationMessage};