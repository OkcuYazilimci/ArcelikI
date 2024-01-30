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
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { saveLogs, deleteExtraLogs } from "./controllers/log-controller.js"

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//For swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//load config
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT;

// Add CORS middleware here for leting comm. with different ports
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true, 
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

//app routes
app.use(express.json());
app.use("/api-user", router);
app.use("/api-blog", blogRouter);
app.use("/api-logging", logRouter);

