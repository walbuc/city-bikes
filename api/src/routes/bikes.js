import express from "express";
import BikesController from "../controllers/bikes";
import { client } from "../utils/api-client";

const router = express.Router();
const bikesController = new BikesController(client);

router.get("/:name", (req, res) => bikesController.getByName(req, res));

export default router;
