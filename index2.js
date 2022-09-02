const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { nextPassByTimes } = require('./index');


nextISSTimesForMyLocation() 
  .then((times) => {
    nextPassByTimes(times);
  })
  .catch((error) => {
    console.log("It did not succeed", error.message);
  })
  