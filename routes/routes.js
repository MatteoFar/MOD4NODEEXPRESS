import express from "express";
import DashboardPageController from "../controllers/dashboard.js";
import HomeController from "../controllers/home.js";
import InscriptionController from "../controllers/inscription.js";
import LoginController from "../controllers/loginController.js";
import LoginPageController from "../controllers/loginPage.js";
import checkSession from "../middleware/checkSession.js";

const router = express.Router();

router.get("/", HomeController);
router.post("/", InscriptionController);
router.get("/loginPage", LoginPageController);
router.post("/login", LoginController);
router.get("/dashboard", checkSession, DashboardPageController); // put middleware here

export default router;
