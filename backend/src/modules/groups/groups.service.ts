import prisma from '../../config/prisma';

export const createGroup = async (data: any) => {
  const { name, teacherIds } = data;
  return await prisma.group.create({
    data: {
      name,
      teachers: teacherIds ? {
        connect: teacherIds.map((id: number) => ({ id }))
      } : undefined
    }
  });
};

export const getAllGroups = async () => {
  return await prisma.group.findMany({
    include: {
      teachers: true,
      _count: {
        select: { enrollments: true }
      }
    }
  });
};

export const getGroupById = async (id: number) => {
  return await prisma.group.findUnique({
    where: { id },
    include: {
      teachers: true,
      enrollments: {
        include: {
          student: true
        }
      }
    }
  });
};

export const updateGroup = async (id: number, data: any) => {
  const { name, teacherIds } = data;
  return await prisma.group.update({
    where: { id },
    data: {
      name,
      teachers: teacherIds ? {
        set: teacherIds.map((id: number) => ({ id }))
      } : undefined
    }
  });
};

export const deleteGroup = async (id: number) => {
  return await prisma.group.delete({
    where: { id }
  });
};
