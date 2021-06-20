import { Router } from "express";
import { createUser, getUser, putUser } from "../controllers/user.controller";
const router = Router();

router.route('/')
    .post(createUser);

router.route('/:userId')
    .get(getUser)
    .put(putUser);

export default router;