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
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.createStudent = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, parentId } = data, studentData = __rest(data, ["username", "password", "role", "parentId"]);
    // Convert birthDate to Date object if it exists
    if (studentData.birthDate) {
        studentData.birthDate = new Date(studentData.birthDate);
    }
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield tx.user.create({
            data: {
                username,
                password: hashedPassword,
                role: client_1.Role.STUDENT,
                student: {
                    create: Object.assign(Object.assign({}, studentData), { parentId: parentId ? parseInt(parentId) : undefined })
                }
            },
            include: {
                student: true
            }
        });
        return user;
    }));
});
exports.createStudent = createStudent;
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    role: true,
                    isActive: true
                }
            },
            parent: true
        }
    });
});
exports.getAllStudents = getAllStudents;
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.student.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    username: true,
                    role: true
                }
            },
            parent: true,
            enrollments: true,
            payments: true
        }
    });
});
exports.getStudentById = getStudentById;
const updateStudent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { birthDate } = data, otherData = __rest(data, ["birthDate"]);
    // birthDate handling moved to data object construction below
    return yield prisma_1.default.student.update({
        where: { id },
        data: Object.assign(Object.assign({}, otherData), { birthDate: birthDate ? new Date(birthDate) : undefined })
    });
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStudent = yield prisma_1.default.student.findUnique({
        where: { id },
        include: { user: true }
    });
    if (!existingStudent)
        throw new Error("Student not found");
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (existingStudent.user) {
            yield tx.user.delete({
                where: { id: existingStudent.user.id }
            });
        }
        return yield tx.student.delete({
            where: { id }
        });
    }));
});
exports.deleteStudent = deleteStudent;
