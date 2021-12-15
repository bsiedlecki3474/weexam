import app from '../src/index';
import supertest from 'supertest';

// import enquiries from './enquiries';

import { db } from '../src/Db';

const request = supertest(app)
const root = '/';

describe('API status', () => {
  test('GET: check API status', async () => {
    const res = await request.get(root).expect(200);
    expect(res.body).toHaveProperty('data');
  })
});

// describe('Enquiries', () => enquiries.start())

afterAll(() => db.closeConnection());