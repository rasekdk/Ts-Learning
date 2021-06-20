import { Router } from "express";
import { getUsers } from "../controllers/users.controller";
const router = Router();

router.route('/')
    .get(getUsers)

export default router;