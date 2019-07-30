const faker = require('faker');
const fs = require('fs');
const { mean } = require('mathjs');
const path = require('path');
const moment = require('moment');
const chalk = require('chalk');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let reviewId = 1; // Keep track of reviewId

const createData = (i, writeStreamReview, writeStreamReviewDish) => {
  const starArr = [];

  // Create table review (review, restaurant_id, star, date)
  let reviewData = '';
  const restaurantId = i + 1;

  for (let m = 0; m < 3; m += 1) { // Generates reviews for past 3 months
    let reviewsPerMth; // Number of reviews per month
    if (i < 500000) {
      reviewsPerMth = faker.random.number({ min: 50, max: 100 });
    } else if (i < 1000000) {
      reviewsPerMth = faker.random.number({ min: 10, max: 50 });
    } else {
      reviewsPerMth = faker.random.number({ min: 0, max: 10 });
    }
    for (let j = 0; j < reviewsPerMth; j += 1) { // Generates random review stars for each month
      let review;
      if (i < 100000) {
        review = faker.lorem.sentence();
      } else {
        review = faker.lorem.word();
      }
      const date = month[m].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', '2019'));
      const star = faker.random.number({ min: 1, max: 5 });
      starArr.push(star);
      reviewData += [review, restaurantId, star, date].join(',');
      reviewData += '\n';

      reviewId += 1; // Increment reviewId by one
    }
  }

  // Create table review_dish (review_id, dish_id)
  let dishData = '';
  const dishes = faker.random.number({ min: 1, max: 3 }); // Dishes for 1 review
  for (let k = 0; k < dishes; k += 1) {
    const dishId = faker.random.number({ min: 0, max: i * 2 });
    dishData += [i, dishId].join(',');
    dishData += '\n';
  }

  writeStreamReviewDish.write(dishData, 'utf-8');
  return writeStreamReview.write(reviewData, 'utf-8');
};

function writeData() {
  let i = 1000000; // Change to number of writes, i.e. 10m

  console.time('calculationTime');
  console.log(chalk.blue(`write ${i} listings`));
  console.log(chalk.green(moment().format('LLLL')));

  const writeStreamReview = fs.createWriteStream(path.resolve(__dirname, 'review.csv'));
  const writeStreamReviewDish = fs.createWriteStream(path.resolve(__dirname, 'review_dish.csv'));

  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // Last time!
        createData(i, writeStreamReview, writeStreamReviewDish);
        console.log(chalk.blue(`write ${reviewId} reviews`));
        console.log(chalk.green(moment().format('LLLL')));
        console.timeEnd('calculationTime');
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = createData(i, writeStreamReview, writeStreamReviewDish);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writeStreamReview.once('drain', write);
    }
  }
  write();
}

writeData();
