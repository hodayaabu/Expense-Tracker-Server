import express from "express";

import {
    getUser,
    addUser,
} from "./user.controller.js";

const router = express.Router();


router.get("/:id", getUser);
router.post("/", addUser);


export const userRoutes = router;
