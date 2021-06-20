import { Router } from "express";

// Controllers
import { indexWelcome } from "../controllers/index.controller";

const router =  Router();

router.route('/')
    .get(indexWelcome)

export default router