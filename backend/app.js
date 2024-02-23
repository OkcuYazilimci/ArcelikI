import express from 'express';
import dotenv from 'dotenv';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import logRouter from './routes/logging-router.js';
import emailRouter from './routes/emailVerification-route.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { saveLogs} from "./controllers/log-controller.js";
//import https from 'https';
//import fs from 'fs';

const app = express();

/*const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
}

https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS Server running on port 3000');
})*/

dotenv.config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//For swagger

const PORT = process.env.PORT;

// Add CORS middleware here for leting comm. with different ports
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true, 
}));

connectDB();

//Logging
const morganStream = {
  write: (logData) => {
    saveLogs(logData);
  },
};

app.use(morgan("combined", {stream: morganStream}))

//app routes
app.use(express.json());
app.use("/api-mail", emailRouter);
app.use("/api-user", router);
app.use("/api-blog", blogRouter);
app.use("/api-logging", logRouter);

export default app;