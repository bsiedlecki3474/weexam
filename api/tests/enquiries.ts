import app from '../src/index';
import supertest from 'supertest';

import { getRandomInt, getCurrentDate } from '../src/helpers'

const faker = require('faker');

const request = supertest(app)
const root = '/enquiries/';

class Enquiries {
  id: number;
  recordsTotal: number;

  constructor() {
    faker.locale = 'pl';
  }

  start = () => {
    this.getAll();
    this.getSingle();
    this.postRequired();
    this.delete();
    this.postAll();
    this.update()
    this.delete();

    this.checkErrors();
  }

  getAll = () =>
    test('GET: all records', async () => {
      const res = await request.get(root).expect(200);
      expect(res.body).toHaveProperty('data')
      expect(Array.isArray(res.body.data)).toBeTruthy();
      this.recordsTotal = res.body.recordsTotal;
    })

  getSingle = () => {
    // console.log(this.recordsTotal);
    // const recordsTotal = await request.get(`${root}/recordsTotal`);
    // console.log('from getone', recordsTotal.body)
    const randomId = 1727;//getRandomInt(1, recordsTotal);
    // console.log('random', randomId, this.recordsTotal)
    test(`get single record [${randomId}]`, async () => {
      const res = await request.get(`${root}/${randomId}`).expect(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBeTruthy();
    })
  }

  postRequired = () =>
    test('POST: new post (required data)', async () => {
      const today = getCurrentDate();
      const data = {
        registrationDate: today,
        sourceId: getRandomInt(1, 4),
        firstName: faker.name.firstName(),
      }
      const res = await request
        .post(root)
        .send(data)
        .expect(200)
        expect(res.body.data.affectedRows).toBe(1);
        this.id = res.body.data.insertId;
    })

  postAll = () =>
    test('POST: new post (all data)', async () => {
      const today = getCurrentDate();
      const area1 = getRandomInt(500, 10000);
      const area2 = area1 + getRandomInt(500, 10000);
      const data = {
        registrationDate: today,
        sourceId: getRandomInt(1, 4),
        location: faker.address.city(),
        area1,
        area2,
        tenancyDate: faker.date.future().toISOString().split('T')[0],
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        otherNotes: faker.lorem.sentence(),
        createdBy: 166
      }
      const res = await request
        .post(root)
        .send(data)
        .expect(200)
        expect(res.body.data.affectedRows).toBe(1);
        this.id = res.body.data.insertId;
    })

  update = () =>
    test('POST: update post', async () => {
      const today = getCurrentDate();
      const area1 = getRandomInt(500, 10000);
      const area2 = area1 + getRandomInt(500, 10000);
      const statusId = getRandomInt(1, 12);
      const data = {
        registrationDate: today,
        sourceId: getRandomInt(1, 4),
        location: faker.address.city(),
        area1,
        area2,
        tenancyDate: faker.date.future().toISOString().split('T')[0],
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        otherNotes: faker.lorem.sentence(),
        statusId,
        modifiedBy: 166,
        id: this.id
      }
      const res = await request
        .post(`${root}/${this.id}`)
        .send(data)
        .expect(200)
        expect(res.body.data.affectedRows).toBe(1);
    })

  delete = () =>
    test('DELETE: delete post', async () => {
      const res = await request
        .del(`${root}/${this.id}`)
        .expect(200)
        expect(res.body.data.affectedRows).toBe(1);
        this.id = null;
    })

  checkErrors = () => {
    test(`GET: [ERROR] get post`, async () => {
      await request.get(`${root}/notAnInteger`).expect(400);
    });
    test(`POST: [ERROR] new post`, async () => {
      await request.post(root).expect(400);
    })
    test(`POST: [ERROR] update post`, async () => {
      await request.post(`${root}/1727`).expect(400);
    })
    test(`DELETE: [ERROR] delete post`, async () => {
      await request.delete(`${root}/notAnInteger`).expect(400);
    })
  }
}

export default new Enquiries();