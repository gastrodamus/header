/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-syntax */
import http from 'k6/http';
import { sleep } from "k6";
// const faker = require('faker');
import faker from 'cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

let desiredRPS = 1000; // total RPS for the test

let RPSperVU = 4;

let VUsRequired = Math.round(desiredRPS / RPSperVU);

export let options = {
  rps: desiredRPS,
  vus: VUsRequired,
  duration: '30s',
};

export default function () {
  // let id = faker.random.number({ min: 1, max: 1000 });
  let id = Math.random() * 1000;
  sleep(Math.random() * 30);
  http.get(`http://localhost:3003/api/header/${id}/restaurant`);
  // http.get(`http://localhost:3003/api/header/${id}/category`);
}
