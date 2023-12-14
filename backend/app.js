import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import authRouter from './routes/Auth-Routes.js';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import connectDB from './config/db.js';
//For swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Load config
configDotenv({path: './config/config.env'})

const app = express();

const PORT = process.env.PORT || 6000

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

connectDB();

//Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) // it shows http methods on console
}

// HandleBars
app.engine('.hbs', exphbs({defaulLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//app routes
app.use("/api-user",router)
app.use("/api-blog",blogRouter)
app.use("/auth", authRouter )

