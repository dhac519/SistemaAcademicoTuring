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
exports.deleteGroup = exports.updateGroup = exports.getGroupById = exports.getAllGroups = exports.createGroup = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createGroup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.group.create({
        data
    });
});
exports.createGroup = createGroup;
const getAllGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.group.findMany({
        include: {
            teacher: true,
            _count: {
                select: { enrollments: true }
            }
        }
    });
});
exports.getAllGroups = getAllGroups;
const getGroupById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.group.findUnique({
        where: { id },
        include: {
            teacher: true,
            enrollments: {
                include: {
                    student: true
                }
            }
        }
    });
});
exports.getGroupById = getGroupById;
const updateGroup = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.group.update({
        where: { id },
        data
    });
});
exports.updateGroup = updateGroup;
const deleteGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.group.delete({
        where: { id }
    });
});
exports.deleteGroup = deleteGroup;
