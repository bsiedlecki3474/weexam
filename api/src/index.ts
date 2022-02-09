import express, { json, urlencoded, Request, Response } from "express";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import { auth, user, group, test } from './routes';
import errorMiddleware from './middleware/errorMiddleware';
import { APP_URL } from './config';
// import { db } from './Db';

const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(helmet());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", APP_URL);
	res.header('Access-Control-Allow-Credentials', "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
		return res.status(200).send({
			data: "API listening for requests"
		});
	}
);

app.use('/auth/', auth);
app.use('/user/', user);
app.use('/group/', group);
app.use('/test/', test);

app.use(errorMiddleware);

export default app;

// https://restfulapi.net/resource-naming/
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

// 200 ok
// 400 Bad Request – This means that client-side input fails validation.
// 401 Unauthorized – This means the user isn’t not authorized to access a resource. It usually returns when the user isn’t authenticated.
// 403 Forbidden – This means the user is authenticated, but it’s not allowed to access a resource.
// 404 Not Found – This indicates that a resource is not found.
// 500 Internal server error – This is a generic server error. It probably shouldn’t be thrown explicitly.
// 502 Bad Gateway – This indicates an invalid response from an upstream server.
// 503 Service Unavailable – This indicates that something unexpected happened on server side (It can be anything like server overload, some parts of the system failed, etc.).

// {
//   "data": {
//     "id": 1001,
//     "name": "Wing"
//   }
// }
// {
//   "error": {
//     "code": 404,
//     "message": "ID not found"
//   }
// }
