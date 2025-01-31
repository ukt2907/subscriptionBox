import express from'express';
import { createSubsController } from '../controllers/subsController.js';
import { authenticationToken } from '../middlewares/authenticationMiddleware.js';
const router = express.Router();

router.post('/create-subscription', authenticationToken, createSubsController);

export default router;