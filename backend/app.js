import express from 'express';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import authRouter from './routes/Auth-Routes.js';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import connectDB from './config/db.js';
import passport from 'passport';
import session from 'express-session';
import {} from './config/passport.js';
const app = express();

//For swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Load config
config();

// passport config
import './config/passport.js'

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

connectDB();

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // it shows http methods on console
}

// HandleBars
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//sessions
app.use(session({
    secret: 'keyboard car',
    resave: false,
    saveUninitialized: false,
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app routes
app.use(express.json());
app.use("/api-user", router);
app.use("/api-blog", blogRouter);
app.use("/auth", authRouter);


