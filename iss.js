const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback('statusCode:', response && response.statusCode, null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};
module.exports = {
  fetchMyIP,
};
