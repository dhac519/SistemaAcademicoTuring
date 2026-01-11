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
exports.deleteParent = exports.updateParent = exports.getParentById = exports.getAllParents = exports.createParent = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createParent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = data, parentData = __rest(data, ["username", "password", "role"]);
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield tx.user.create({
            data: {
                username,
                password: hashedPassword,
                role: client_1.Role.PARENT,
                parent: {
                    create: parentData
                }
            },
            include: {
                parent: true
            }
        });
        return user;
    }));
});
exports.createParent = createParent;
const getAllParents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.parent.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    role: true,
                    isActive: true
                }
            },
            students: true
        }
    });
});
exports.getAllParents = getAllParents;
const getParentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.parent.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    username: true,
                    role: true
                }
            },
            students: true
        }
    });
});
exports.getParentById = getParentById;
const updateParent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.parent.update({
        where: { id },
        data
    });
});
exports.updateParent = updateParent;
const deleteParent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingParent = yield prisma_1.default.parent.findUnique({
        where: { id },
        include: { user: true }
    });
    if (!existingParent)
        throw new Error("Parent not found");
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (existingParent.user) {
            yield tx.user.delete({
                where: { id: existingParent.user.id }
            });
        }
        return yield tx.parent.delete({
            where: { id }
        });
    }));
});
exports.deleteParent = deleteParent;
