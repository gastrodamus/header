/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-syntax */
import http from 'k6/http';
import { check, sleep } from "k6";
import faker from 'cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export let options = {
  rps: 1000,
  vus: 150,
  duration: '3m',
};

export default function () {
  let id = faker.random.number({ min: 1, max: 1000 });
  http.get(`http://localhost:3003/api/header/${id}`);
}
