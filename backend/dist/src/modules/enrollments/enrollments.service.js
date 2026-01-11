"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnrollment = exports.updateEnrollmentStatus = exports.getEnrollments = exports.enrollStudent = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const enrollStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, groupId, paymentPlanId } = data;
    // Check if already enrolled in this group (active)
    const existingEnrollment = yield prisma_1.default.enrollment.findFirst({
        where: {
            studentId,
            groupId,
            status: 'ACTIVE'
        }
    });
    if (existingEnrollment) {
        throw new Error('Student is already actively enrolled in this group');
    }
    return yield prisma_1.default.enrollment.create({
        data: {
            studentId,
            groupId,
            paymentPlanId,
            status: 'ACTIVE'
        }
    });
});
exports.enrollStudent = enrollStudent;
const getEnrollments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.enrollment.findMany({
        include: {
            student: {
                select: {
                    names: true,
                    lastName: true,
                    dni: true
                }
            },
            group: {
                select: {
                    name: true
                }
            },
            paymentPlan: true
        }
    });
});
exports.getEnrollments = getEnrollments;
const updateEnrollmentStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.enrollment.update({
        where: { id },
        data: { status }
    });
});
exports.updateEnrollmentStatus = updateEnrollmentStatus;
const deleteEnrollment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.enrollment.delete({
        where: { id }
    });
});
exports.deleteEnrollment = deleteEnrollment;
