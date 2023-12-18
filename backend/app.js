import express from 'express';
import dotenv from 'dotenv';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import authRouter from './routes/Auth-Routes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import connectDB from './config/db.js';
import passport from 'passport';
import cors from 'cors'; // Add this line
import session from 'express-session';
import './config/passport.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//For swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//load config
dotenv.config({ path: './config/config.env' });

// passport config
import './config/passport.js'

const PORT = process.env.PORT || 6000;

// Add CORS middleware here
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

connectDB();

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // it shows http methods on console
}

// HandleBars
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs', layoutsDir: './views/layouts' });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
 
// Sessions
const MongoStore = (await import('connect-mongo')).default; 

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })
  )

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
const publicPath = join(__dirname, 'public');
app.use(express.static(publicPath));

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

