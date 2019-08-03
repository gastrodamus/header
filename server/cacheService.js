// cache service
const redis = require('redis');

const client = redis.createClient();

function cache(req, res, next) {
  // const key = req.method + req.originalUrl;
  // client.get(key, (err, data) => {
  //   if (err) throw err;
  //   if (data != null) {
  //     res.send(JSON.parse(data));
  //   } else {
  //     next();
  //   }
  // });

  next();
}

module.exports = {
  client,
  cache,
};
