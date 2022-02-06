const env = process.env;

const DB_HOST = env.DB_HOST || 'db'
const DB_USER = env.DB_USER || 'root';
const DB_PASS = env.DB_PASS || 'root';
const DB_DATABASE = env.DB_DATABASE || 'weexam';

const COOKIE_PATH = '/';
const JWT_SECRET = 'weexam_s&wf4j&fwDDCup9b';

const APP_URL = 'http://localhost:3000';
const API_URL = process.env.NODE_ENV === "production"
  ? 'http://localhost:3456'
  : 'http://localhost:3456'

export {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
  API_URL,
  APP_URL,
  COOKIE_PATH,
  JWT_SECRET
}