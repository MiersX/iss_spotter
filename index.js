const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});

*/
/*
fetchCoordsByIP('108.172.118.142', (error, coordinates) => {
  if (error) {
    console.log("Not completed!", error)
    return;
  }
  console.log("Success! Coordinates:", coordinates)
});


'108.172.118.142'
*/

fetchISSFlyOverTimes({ latitude: '48.4284207', longitude: -123.3656444 }, (error, times) => {
  if (error) {
    console.log("Not completed!", error);
    return;
  }
  console.log("Success! Fly-over times:", times);
})




48.4284207
-123.3656444