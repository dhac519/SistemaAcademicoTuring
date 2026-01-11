"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const staff_routes_1 = __importDefault(require("../modules/staff/staff.routes"));
const students_routes_1 = __importDefault(require("../modules/students/students.routes"));
const parents_routes_1 = __importDefault(require("../modules/parents/parents.routes"));
const groups_routes_1 = __importDefault(require("../modules/groups/groups.routes"));
const enrollments_routes_1 = __importDefault(require("../modules/enrollments/enrollments.routes"));
const payment_plans_routes_1 = __importDefault(require("../modules/payment-plans/payment-plans.routes"));
const payments_routes_1 = __importDefault(require("../modules/payments/payments.routes"));
const router = (0, express_1.Router)();
// Public Routes
router.use('/auth', auth_routes_1.default);
// Protected Routes (Apply authenticate middleware)
router.use('/staff', auth_middleware_1.authenticate, staff_routes_1.default);
router.use('/students', auth_middleware_1.authenticate, students_routes_1.default);
router.use('/parents', auth_middleware_1.authenticate, parents_routes_1.default);
router.use('/groups', auth_middleware_1.authenticate, groups_routes_1.default);
router.use('/enrollments', auth_middleware_1.authenticate, enrollments_routes_1.default);
router.use('/payment-plans', auth_middleware_1.authenticate, payment_plans_routes_1.default);
router.use('/payments', auth_middleware_1.authenticate, payments_routes_1.default);
exports.default = router;
