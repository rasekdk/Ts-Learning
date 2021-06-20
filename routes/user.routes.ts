import { Router } from "express";
import { createUser, getUser } from "../controllers/user.controller";
const router = Router();

router.route('/')
    .post(createUser);

router.route('/:userId')
    .get(getUser);

export default router;