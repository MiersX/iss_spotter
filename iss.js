const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
     return callback(error, null);
      
    }
    if (response.statusCode !== 200) {
    callback('statusCode:', response && response.statusCode, null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};





const fetchCoordsByIP = function(ip, callback) {
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




const fetchISSFlyOverTimes = function (coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`statusCode:${response.statusCode} when fetching the fly over data`), null);
      return;
    }
    const data = JSON.parse(body).response;

    callback(null, data);

  });
};




const nextISSTimesForMyLocation = (callback) => {
 
  fetchMyIP((error, ip) => {
    if (error) {
     return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
       return callback(error, null);
      }
      fetchISSFlyOverTimes(coordinates, (error, times) => {
        if (error) {
         return callback(error, null);
        }
        callback(null, times)
      });
    });
  });
};





module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};



