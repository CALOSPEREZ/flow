import * as flow from "@componentsController/flow/controller";
import { Router } from "express";
import * as validate from "@componentsController/flow/middleware/validators";
const router = Router();

router.post("/flow", [validate.createRequest], flow.create);

export default router;
