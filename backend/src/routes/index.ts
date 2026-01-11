import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

import authRoutes from '../modules/auth/auth.routes';
import staffRoutes from '../modules/staff/staff.routes';
import studentRoutes from '../modules/students/students.routes';
import parentRoutes from '../modules/parents/parents.routes';
import groupRoutes from '../modules/groups/groups.routes';
import enrollmentRoutes from '../modules/enrollments/enrollments.routes';
import paymentPlanRoutes from '../modules/payment-plans/payment-plans.routes';
import paymentRoutes from '../modules/payments/payments.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';

const router = Router();

// Public Routes
router.use('/auth', authRoutes);

// Protected Routes (Apply authenticate middleware)
router.use('/staff', authenticate, staffRoutes);
router.use('/students', authenticate, studentRoutes);
router.use('/parents', authenticate, parentRoutes);
router.use('/groups', authenticate, groupRoutes);
router.use('/enrollments', authenticate, enrollmentRoutes);
router.use('/payment-plans', authenticate, paymentPlanRoutes);
router.use('/payments', authenticate, paymentRoutes);
router.use('/dashboard', authenticate, dashboardRoutes);

export default router;
