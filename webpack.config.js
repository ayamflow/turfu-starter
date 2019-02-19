const dev = require("./webpack/dev.config.js");
const prod = require("./webpack/prod.config.js");

module.exports = function(env) {
  return env.production ? prod : dev;
};
