const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
}


const fetchCoordsByIP = (body) => {
  const parsedData = JSON.parse(body).ip;
  return request(`http://ipwho.is/${parsedData}`)
};


const fetchISSFlyOverTimes = (body) => {
  const dataLatitude = JSON.parse(body).latitude;
  const dataLongitude = JSON.parse(body).longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${dataLatitude}&lon=${dataLongitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { parsedData } = JSON.parse(data);
    return parsedData;
  });
};



module.exports = {
nextISSTimesForMyLocation,
}