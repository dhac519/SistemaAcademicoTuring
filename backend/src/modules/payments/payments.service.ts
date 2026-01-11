import prisma from '../../config/prisma';

export const recordPayment = async (data: any) => {
  return await prisma.payment.create({
    data
  });
};

export const getPayments = async () => {
  return await prisma.payment.findMany({
    include: {
      student: {
        select: {
          names: true,
          lastName: true,
          dni: true
        }
      }
    }
  });
};

export const getPaymentById = async (id: number) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: {
      student: true
    }
  });
};
export const updatePayment = async (id: number, data: any) => {
  return await prisma.payment.update({
    where: { id },
    data
  });
};

export const deletePayment = async (id: number) => {
  return await prisma.payment.delete({
    where: { id }
  });
};
