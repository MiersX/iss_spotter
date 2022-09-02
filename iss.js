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





const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback('statusCode:', response && response.statusCode, null);
      return;
    }

    const data = JSON.parse(body);
    const coords = {};
    coords.latitude = data.latitude;
    coords.longitude = data.longitude;

    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }
    callback(null, coords);
  });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};



