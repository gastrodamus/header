const faker = require('faker');
const fs = require('fs');
const { Pool, Client } = require('pg');
const { mean } = require('mathjs');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const createReviews = (i, ) => {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];
  const stars = [];

  for (let j = 0; j < year.length; j += 1) { // Generates a random review from each month for the past 5 years
    for (let k = 0; k < month.length; k += 1) {
      const id = i + 1;
      const star = faker.random.number({ min: 1, max: 5 });
      stars.push(star);
      const date = month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', year[j]));
      let data = [id, star, date].join(',');
      data += '\n';
      writeStreamReview.write(data, 'utf-8');
    }
  }
}

writeOneMillionTimes();

function writeOneMillionTimes() {
  let i = 100000;
  const encoding = 'utf-8';
  const writeStreamReview = fs.createWriteStream('./server/csv/review.csv');

  write();
  function write() {
    let ok = true;
    do {
      i--;
      let dataReview = [
        makeRestaurantName(),
        // average,
        faker.random.number({ min: 1, max: 4 }),
        faker.lorem.words(),
      ].join(',');
      dataReview += '\n';
      if (i === 0) {
        // Last time!
        writeStreamReview.write(dataReview, encoding);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writeStreamReview.write(dataReview, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writeStreamReview.once('drain', write);
    }
  }
}

const createData = () => {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];

  const writeStream = fs.createWriteStream('./server/csv/business.csv');
  const writeStreamReview = fs.createWriteStream('./server/csv/review.csv');
  for (let i = 0; i < 1000000; i += 1) { // Generates 1000 random entries
    const stars = [];

    for (let j = 0; j < year.length; j += 1) { // Generates a random review from each month for the past 5 years
      for (let k = 0; k < month.length; k += 1) {
        const id = i + 1;
        const star = faker.random.number({ min: 1, max: 5 });
        stars.push(star);
        const date = month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', year[j]));
        let data = [id, star, date].join(',');
        data += '\n';
        writeStreamReview.write(data, 'utf-8');
      }
    }
    const average = mean(stars);
    let dataReview = [
      makeRestaurantName(),
      average,
      faker.random.number({ min: 1, max: 4 }),
      faker.lorem.words(),
    ].join(',');
    dataReview += '\n';
    writeStream.write(dataReview, 'utf-8');
  }
  writeStream.end();
  writeStreamReview.end();
};

// createData();

// const pool = new Pool({
//   user: 'root',
//   host: 'localhost',
//   database: 'business',
//   password: 'password',
// });

// (async () => {
//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');
//     for (let i = 0; i < 100000; i += 1) {
//       const query = {
//         text: 'INSERT INTO business_schema.items(name, avg_stars, price, categories) VALUES($1, $2, $3, $4)',
//         values: [
//           makeRestaurantName(),
//           faker.random.number({ min: 1, max: 5 }),
//           faker.random.number({ min: 1, max: 4 }),
//           faker.lorem.words(),
//         ],
//       };
//       await client.query(query);
//     }
//     await client.query('COMMIT');
//   } catch (e) {
//     await client.query('ROLLBACK');
//     throw e;
//   } finally {
//     client.release();
//   }
// })().catch(e => console.log(e.stack));
