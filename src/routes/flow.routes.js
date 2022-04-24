import * as flow from "@componentsController/flow/controller";
import { Router } from "express";
import * as validate from "@componentsController/flow/middleware/validators";
import * as middlewares from "@libs/middlewares";
const router = Router();
router.post("/flow", [validate.createRequest], flow.create);
router.post("/payment_confirm", flow.payment_confirm);
router.get("/result", middlewares.token, flow.result);

export default router;
