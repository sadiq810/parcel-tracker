import express from "express";
import routes from "./routes";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const portNumber = 8000;
const app = express();

// for avoiding cross site origin issue.
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All requests are forwarded to routes/index.js file.
app.use('/', routes);

export {app as default, portNumber};
