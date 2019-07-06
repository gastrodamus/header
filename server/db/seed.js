const db = require('./index.js');
const Business = require('./Business.js');
const faker = require('faker')

// Generates 100 random entries
for (var i = 0; i < 100; i++) {
  var randomCount = faker.random.number({min: 10, max: 30})
  var reviews = [];

  //  Generates random number of reviews
  for (var j  = 0; j < randomCount; j++) {
    reviews.push({star: faker.random.number({min: 1, max: 5})})
  }

  Business.create({  
    name: faker.company.companyName(),
    avg_stars: faker.random.number(5),
    price: faker.random.number({min: 1, max: 3}),
    categories: faker.random.words(),
    reviews: reviews
    }, (err, doc) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

console.log('100 random entries generated')