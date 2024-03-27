import { Signup, Login } from '../Controllers/AuthController.js';
import express from "express";
const router = express.Router();
import {userVerification} from "../Middlewares/AuthMiddleware.js";


router.post('/',userVerification);


router.post('/signup', Signup)
router.post('/login', Login)

export default router;