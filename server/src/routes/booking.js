import { Router } from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = Router();

router.post('/reservas', createBooking);

export default router;
