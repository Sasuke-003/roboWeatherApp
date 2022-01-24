import axios from 'axios';

export const location = {
  getPlaceNameFromLatLon: async (lat, lon) => {
    try {
      const apiKey = 'lQyJwXYtIADsMTnOcV4cYkWVWbHkbtuI_RVYd6EBuqk';
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${apiKey}&mode=retrieveAddresses&prox=${lat},${lon}`;
      const res = await axios.get(url);
      return res.data.Response.View[0].Result[0].Location.Address.City;
    } catch (e) {
      console.warn(e);
      return 'puttur';
    }
  },
};
