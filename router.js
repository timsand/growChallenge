import { Router } from "express";
import { getPeople } from "./controllers/peopleController.js";
import { getPlanets } from "./controllers/planetController.js";

const router = Router();

router.get("/people", getPeople);
router.get("/planets", getPlanets);

export { router };
