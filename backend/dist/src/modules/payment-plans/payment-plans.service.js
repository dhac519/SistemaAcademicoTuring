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
exports.deletePaymentPlan = exports.updatePaymentPlan = exports.getPaymentPlanById = exports.getAllPaymentPlans = exports.createPaymentPlan = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createPaymentPlan = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.paymentPlan.create({
        data
    });
});
exports.createPaymentPlan = createPaymentPlan;
const getAllPaymentPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.paymentPlan.findMany();
});
exports.getAllPaymentPlans = getAllPaymentPlans;
const getPaymentPlanById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.paymentPlan.findUnique({
        where: { id },
        include: {
            enrollments: true
        }
    });
});
exports.getPaymentPlanById = getPaymentPlanById;
const updatePaymentPlan = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.paymentPlan.update({
        where: { id },
        data
    });
});
exports.updatePaymentPlan = updatePaymentPlan;
const deletePaymentPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.paymentPlan.delete({
        where: { id }
    });
});
exports.deletePaymentPlan = deletePaymentPlan;
