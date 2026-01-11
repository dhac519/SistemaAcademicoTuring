import prisma from '../../config/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const createParent = async (data: any) => {
  const { username, password, role, ...parentData } = data;

  return await prisma.$transaction(async (tx) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await tx.user.create({
      data: {
        username,
        password: hashedPassword,
        role: Role.PARENT,
        parent: {
          create: parentData
        }
      },
      include: {
        parent: true
      }
    });
    return user;
  });
};

export const getAllParents = async () => {
  return await prisma.parent.findMany({
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
};

export const getParentById = async (id: number) => {
  return await prisma.parent.findUnique({
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
};

export const updateParent = async (id: number, data: any) => {
  return await prisma.parent.update({
    where: { id },
    data
  });
};

export const deleteParent = async (id: number) => {
  const existingParent = await prisma.parent.findUnique({
    where: { id },
    include: { user: true }
  });
  
  if (!existingParent) throw new Error("Parent not found");

  return await prisma.$transaction(async (tx) => {
    if (existingParent.user) {
      await tx.user.delete({
        where: { id: existingParent.user.id }
      });
    }

    return await tx.parent.delete({
      where: { id }
    });
  });
};
