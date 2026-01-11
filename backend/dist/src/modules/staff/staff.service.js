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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.getStaffById = exports.getAllStaff = exports.createStaff = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createStaff = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = data, staffData = __rest(data, ["username", "password", "role"]);
    // Transaction to create User and Staff together
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield tx.user.create({
            data: {
                username,
                password: hashedPassword,
                role: role,
                staff: {
                    create: staffData
                }
            },
            include: {
                staff: true
            }
        });
        return user;
    }));
});
exports.createStaff = createStaff;
const getAllStaff = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.staff.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    role: true,
                    isActive: true
                }
            }
        }
    });
});
exports.getAllStaff = getAllStaff;
const getStaffById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.staff.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    username: true,
                    role: true
                }
            }
        }
    });
});
exports.getStaffById = getStaffById;
const updateStaff = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.staff.update({
        where: { id },
        data
    });
});
exports.updateStaff = updateStaff;
const deleteStaff = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // First find the user associated with this staff
    // Check if staff exists
    const existingStaff = yield prisma_1.default.staff.findUnique({
        where: { id },
        include: { user: true }
    });
    if (!existingStaff)
        throw new Error("Staff not found");
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // If there is an associated user, delete it first (because User holds FK to Staff)
        if (existingStaff.user) {
            yield tx.user.delete({
                where: { id: existingStaff.user.id }
            });
        }
        // Then delete the staff
        return yield tx.staff.delete({
            where: { id }
        });
    }));
});
exports.deleteStaff = deleteStaff;
