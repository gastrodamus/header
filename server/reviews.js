const express = require('express')
const faker = require('faker');

const app = express();
const port = 4000;
const path = require('path');

let reviewData = '';

function simpleHash(str, max) {
  var hash = 0;
  if (str.length == 0) {
      return hash;
  }
  for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

function generateReviews(i) {
	const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	const stars = [];

	const restaurantId = i + 1;
  let reviewData = [];
  let day = 1;
  let dishId = 1;

	for (let m = 0; m < 3; m += 1) { // Generates reviews for past 3 months
		const reviewsPerMth = simpleHash(i, 200);
		for (let j = 0; j < reviewsPerMth; j += 1) { // Generates random reviews for each month
		  const date = month[m].concat('-', day.toString().concat('-', '2019'));
		  const star = faker.random.number({ min: 1, max: 5 });
		  const reviewId = m * 3 + j;
		  stars.push(star);
		  reviewData.push({
		  	reviewId,
		  	restaurantId,
		  	date,
		  	star,
		  	dishId,
		  });
		  dishId = (dishId + 1) % 10;
		  day = (day + 1) % 28;
		};
	};

	return reviewData;
}

app.get('/api/reviews/:id', (req, res) => {
	console.log('getting: ', req.params.id);
	const reviews = generateReviews(req.params.id);
	console.log(reviews.length, 'len');
	res.send(reviews);
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
