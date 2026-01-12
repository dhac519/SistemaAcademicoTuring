import prisma from '../../config/prisma';

export const enrollStudent = async (data: any) => {
  const { studentId, groupId, paymentPlanId } = data;
  
  // Check if already enrolled in this group (active)
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      studentId,
      groupId,
      status: 'ACTIVE'
    }
  });

  if (existingEnrollment) {
    throw new Error('Student is already actively enrolled in this group');
  }

  return await prisma.enrollment.create({
    data: {
      studentId,
      groupId,
      paymentPlanId,
      status: 'ACTIVE'
    }
  });
};

export const getEnrollments = async () => {
  return await prisma.enrollment.findMany({
    include: {
      student: {
        select: {
          names: true,
          lastName: true,
          dni: true,
          id: true
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
};

export const updateEnrollment = async (id: number, data: any) => {
  const { studentId, groupId, paymentPlanId, status } = data;
  return await prisma.enrollment.update({
    where: { id },
    data: {
      groupId: groupId ? parseInt(groupId) : undefined,
      paymentPlanId: paymentPlanId ? parseInt(paymentPlanId) : undefined,
      status // Allow updating status via general update if needed
    }
  });
};

export const updateEnrollmentStatus = async (id: number, status: string) => {
  return await prisma.enrollment.update({
    where: { id },
    data: { status }
  });
};

export const deleteEnrollment = async (id: number) => {
  return await prisma.enrollment.delete({
    where: { id }
  });
};
