import prisma from '../../config/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const createStudent = async (data: any) => {
  const { username, password, role, parentId, ...studentData } = data;

  // Convert birthDate to Date object if it exists
  if (studentData.birthDate) {
    studentData.birthDate = new Date(studentData.birthDate);
  }

  return await prisma.$transaction(async (tx) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await tx.user.create({
      data: {
        username,
        password: hashedPassword,
        role: Role.STUDENT,
        student: {
          create: {
            ...studentData,
            parentId: parentId ? parseInt(parentId) : undefined
          }
        }
      },
      include: {
        student: true
      }
    });
    return user;
  });
};

export const getAllStudents = async () => {
  return await prisma.student.findMany({
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
};

export const getStudentById = async (id: number) => {
  return await prisma.student.findUnique({
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
};

export const updateStudent = async (id: number, data: any) => {
  const { birthDate, ...otherData } = data;
  
  // birthDate handling moved to data object construction below

  return await prisma.student.update({
    where: { id },
    data: {
        ...otherData,
        birthDate: birthDate ? new Date(birthDate) : undefined
    }
  });
};

export const deleteStudent = async (id: number) => {
  const existingStudent = await prisma.student.findUnique({
    where: { id },
    include: { user: true }
  });
  
  if (!existingStudent) throw new Error("Student not found");

  return await prisma.$transaction(async (tx) => {
    if (existingStudent.user) {
      await tx.user.delete({
        where: { id: existingStudent.user.id }
      });
    }

    return await tx.student.delete({
      where: { id }
    });
  });
};

export const getStudentBalance = async (id: number) => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      enrollments: {
        where: { status: 'ACTIVE' },
        include: { paymentPlan: true }
      },
      payments: true
    }
  });

  if (!student) throw new Error("Student not found");

  let totalDue = 0;
  // Sum cost of active enrollments
  student.enrollments.forEach(enrollment => {
    if (enrollment.paymentPlan) {
      totalDue += Number(enrollment.paymentPlan.cost);
    }
  });

  let totalPaid = 0;
  // Sum all payments
  student.payments.forEach(payment => {
    totalPaid += Number(payment.amount);
  });

  const balance = totalDue - totalPaid;

  return {
    studentId: student.id,
    studentName: `${student.names} ${student.lastName}`,
    totalDue,
    totalPaid,
    balance: balance > 0 ? balance : 0,
    enrollments: student.enrollments.map(e => ({
      id: e.id,
      plan: e.paymentPlan?.name || 'Unknown',
      cost: Number(e.paymentPlan?.cost || 0)
    })),
    payments: student.payments.map(p => ({
      id: p.id,
      amount: Number(p.amount),
      date: p.createdAt,
      method: p.method
    }))
  };
};
