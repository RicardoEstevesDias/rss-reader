// Importation des dépendances
import createError from 'http-errors';
import express from "express";
import helmet from 'helmet';
import path from "path"
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from "dotenv";

// Importation des routes
import { feedRouter } from "./routes/feedRouter.js";

// Initialise l'application Express
const app = express();

// Chargement des variables d'environnement depuis un fichier .env
dotenv.config();

// Définition de l'environnement Express
app.set('env', process.env.NODE_ENV)

// Mise en place d'une protection des en-têtes HTTP
app.use(helmet());

// Mise en place du moteur de template
app.set('view engine', process.env.VIEW_ENGINE);
const __filename = fileURLToPath(import.meta.url);
app.set('views', path.join(path.dirname(__filename), '/ressources/views')); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(path.dirname(__filename), 'public')));


// Routes
app.use("/" ,feedRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  // Export de l'application
  export default app;