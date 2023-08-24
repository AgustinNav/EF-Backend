import express from 'express';
import expressHandlebars from 'express-handlebars';
import morgan from "morgan";
import { _dirname } from './utils.js';
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars'
export { devLogger } from './logger.js';

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'

import cartsRouter from './router/carts.router.js';
import ticketRouter from './router/ticket.router.js';
import productsRouter from './router/products.router.js';
import usersViewRouter from './router/users.view.router.js';
import jwtRouter from './router/jwt.router.js';
import mockRouter from './router/mock.router.js';
import loggerRouter from './router/logger.router.js'

import errorHandler from './services/errors/MiddleErrors.js'
import { addLogger } from './logger.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(morgan("dev"));
app.use(cors());
app.use(addLogger);

app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))   // Motor
app.set('views', _dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.static(_dirname + "/public"));

app.use(cookieParser("ThisIsTheSecretsOfCooooooooookies"));

initializePassport();
app.use(passport.initialize());

app.use((req, res, next) => {
    console.log('Cookies: ', req.cookies);
    next();
});

// Config Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentacion API Eccomerce',
            description: 'Documentacion para el uso de API Eccomerce'
        }
    },
    apis: [`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

app.use('/api/ticket', ticketRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersViewRouter);
app.use('/api/jwt', jwtRouter);
app.use('/mocking', mockRouter);
app.use('/loggerTest', loggerRouter);
app.use(errorHandler);

let server;
const startServer = (port = process.env.PORT || 8080) => {
    return new Promise((resolve) => {
        if (!server || !server.listening) {
            server = app.listen(port, () => {
                console.log(`Servidor corriendo en el puerto: ${port}`);
                resolve(server);
            });
        } else {
            console.log('El servidor ya está en ejecución');
            resolve(server);
        }
    });
};

startServer()

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
};

mongoInstance();

export default app;