import {Router} from "express";
import { feedController } from "../controllers/feedController.js";


const feedRouter = Router();


feedRouter.get('/', feedController.index);


export { feedRouter };