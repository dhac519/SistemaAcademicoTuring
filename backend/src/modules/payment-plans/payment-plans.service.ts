import prisma from '../../config/prisma';

export const createPaymentPlan = async (data: any) => {
  return await prisma.paymentPlan.create({
    data
  });
};

export const getAllPaymentPlans = async () => {
  return await prisma.paymentPlan.findMany();
};

export const getPaymentPlanById = async (id: number) => {
  return await prisma.paymentPlan.findUnique({
    where: { id },
    include: {
      enrollments: true
    }
  });
};

export const updatePaymentPlan = async (id: number, data: any) => {
  return await prisma.paymentPlan.update({
    where: { id },
    data
  });
};

export const deletePaymentPlan = async (id: number) => {
  return await prisma.paymentPlan.delete({
    where: { id }
  });
};
