import express from 'express';
import {
    raiseComplaint,
    allComplaints,
    complaintHistory
} from '../Controllers/ComplaintController.js';
import { userVerification } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();

router.route('/').post(raiseComplaint);
router.route('/all').get(allComplaints, userVerification);
router.route('/history').get(complaintHistory);

export default router;