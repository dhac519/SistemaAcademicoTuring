import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async () => {
  const [
    studentsCount,
    teachersCount,
    groupsCount,
    parentsCount,
    enrollmentsCount,
    totalPayments
  ] = await prisma.$transaction([
    prisma.student.count(),
    prisma.staff.count({ where: { user: { role: 'TEACHER' } } }),
    prisma.group.count(),
    prisma.parent.count(),
    prisma.enrollment.count({ where: { status: 'ACTIVE' } }),
    prisma.payment.aggregate({
      _sum: {
        amount: true
      }
    })
  ]);

  return {
    students: studentsCount,
    teachers: teachersCount,
    groups: groupsCount,
    parents: parentsCount,
    activeEnrollments: enrollmentsCount,
    totalIncome: totalPayments._sum.amount || 0
  };
};
