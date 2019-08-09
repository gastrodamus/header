// cache service
import redis from 'redis';

const client = redis.createClient();

function cache(req, res, next) {
  const key = req.method + req.originalUrl;
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

export {
  client,
  cache,
};
