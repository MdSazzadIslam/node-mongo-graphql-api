const NodeGeocoder = require("node-geocoder");
require("dotenv").config({ path: "../.env" });
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  https: "https",
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);
module.exports = geocoder;
