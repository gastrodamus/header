const faker = require('faker');
const db = require('./index.js');
const Business = require('./Business.js');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const createData = () => {
  for (let i = 0; i < 100; i += 1) { // Generates 100 random entries
    const randomCount = faker.random.number({ min: 10, max: 30 });
    const reviews = [];
    for (let j = 0; j < randomCount; j += 1) { //  Generates random number of reviews
      reviews.push({ star: faker.random.number({ min: 1, max: 5 }) });
    }
    Business.create({
      name: makeRestaurantName(),
      avg_stars: faker.random.number(5),
      price: faker.random.number({ min: 1, max: 3 }),
      categories: faker.random.words(),
      reviews,
    }).then(() => {
      db.close();
    }).catch(() => {
      db.close();
    });
  }
};

createData();

console.log('100 random entries generated');
