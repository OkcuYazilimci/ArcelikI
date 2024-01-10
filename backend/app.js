import express from 'express';
import dotenv from 'dotenv';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import logRouter from './routes/logging-router.js';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import morgan from 'morgan';
import connectDB from './config/db.js';
import passport from 'passport';
import cors from 'cors'; // Add this line
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { saveLogs, deleteExtraLogs } from "./controllers/log-controller.js"
//import {getStorage, ref, uploadBytesResumable} from "firebase/storage";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.json());

//For swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//load config
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 6000;

// Add CORS middleware here for leting comm. with different ports
app.use(cors({
  origin: 'http://localhost:3001', // Frontend'inizin adresi
  credentials: true, // Cookieleri paylaşmak için gerekli
}));

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

connectDB();

//Logging
const morganStream = {
  write: (logData) => {
    saveLogs(logData);
  },
};

app.use(morgan("combined", {stream: morganStream}))

// Sessions
const MongoStore = (await import('connect-mongo')).default; 

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    })
  )

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//sessions
app.use(session({
    secret: 'keyboard car',
    resave: false,
    saveUninitialized: false,
}));

//app routes
app.use(express.json());
app.use("/api-user", router);
app.use("/api-blog", blogRouter);
app.use("/api-logging", logRouter);

