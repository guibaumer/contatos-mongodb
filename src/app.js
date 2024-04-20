import express from 'express';
import homeRouter from './routes/homeRouter.js';
import userRouter from './routes/userRouter.js';
import contactsRouter from './routes/contactsRouter.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import * as dotenv from 'dotenv';
dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.enable('trust proxy'),
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', ['https://lista-de-contatos-next.netlify.app']); 
            res.setHeader('Access-Control-Allow-Headers', 'content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            next();  
        });
        this.app.use(session({
            store: MongoStore.create({
              mongoUrl: process.env.URI,
              ttl: 1000 * 60 * 60 * 24 * 7, // One week
              autoRemove: 'native' 
            }),
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
          }));
          
    }

    routes() {
        this.app.use('/', homeRouter);
        this.app.use('/user', userRouter);
        this.app.use('/contacts', contactsRouter);
    }
}

export default new App().app;

