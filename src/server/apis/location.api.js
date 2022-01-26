import axios from 'axios';

// export const location = {
//   getPlaceNameFromLatLon: async (lat, lon) => {
//     try {
//       console.warn(lon);
//       const apiKey = 'SWKqqRNnq87u7pjVAwA_YYwKxGTURf19tss49AHyOtA';
//       const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${apiKey}&mode=retrieveAddresses&prox=${lat},${lon}`;
//       const res = await axios.get(url);
//       console.warn(res);
//       return res.data.Response.View[0].Result[0].Location.Address.City;
//     } catch (e) {
//       console.warn(e);
//       return 'puttur';
//     }
//   },
// };
export const location = {
  getPlaceNameFromLatLon: async (lat, lon) => {
    try {
      const apiKey = 'BAkZ0ozJq16IDwibV5fJQvv3hQrY5io6';
      const url = `https://open.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${lat},${lon}&includeRoadMetadata=true&includeNearestIntersection=true`;
      const res = await axios.get(url);
      return res.data.results[0].locations[0].adminArea5;
    } catch (e) {
      console.warn(e);
      // return 'puttur';
    }
  },
};
