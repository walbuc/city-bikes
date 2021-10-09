import express from "express";
import bikesRoute from "./bikes";

const router = express.Router();

router.use("/bikes", bikesRoute);
router.get("/", (req, res) => res.send("Hello World yes yes yes!"));

export default router;
