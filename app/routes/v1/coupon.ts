import express, { Router } from 'express';
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getSpecificCoupon,
} from '../../controllers/coupon';
import { admin } from '../../middlewares/authMiddleware';
import { handleValidation } from '../../controllers/coupon/create';

export const router: Router = express.Router();

router.post('/create', admin, handleValidation, createCoupon);
router.put('/:id', admin, handleValidation, updateCoupon);
router.delete('/:id', admin, deleteCoupon);
router.get('/all', getAllCoupons);
router.get('/:id', getSpecificCoupon);
