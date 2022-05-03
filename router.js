import { Router } from "express";
import { getPeople } from "./controllers/peopleController.js";

const router = Router();

router.get("/people", getPeople);
router.get("/planets");

export { router };
