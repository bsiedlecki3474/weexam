const env = process.env;

const DB_HOST = env.DB_HOST || 'localhost';
const DB_USER = env.DB_USER || 'root';
const DB_PASS = env.DB_PASS || '';
const DB_DATABASE = env.DB_DATABASE || 'weexam';

const url = {
  prod: '',
  dev: 'http://localhost:3456'
}

export {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
  url
}