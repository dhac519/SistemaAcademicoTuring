import prisma from '../../config/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const createStaff = async (data: any) => {
  const { username, password, role, ...staffData } = data;

  // Transaction to create User and Staff together
  return await prisma.$transaction(async (tx) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await tx.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role as Role,
        staff: {
          create: staffData
        }
      },
      include: {
        staff: true
      }
    });
    return user;
  });
};

export const getAllStaff = async () => {
  return await prisma.staff.findMany({
    include: {
      user: {
        select: {
          username: true,
          role: true,
          isActive: true
        }
      }
    }
  });
};

export const getStaffById = async (id: number) => {
  return await prisma.staff.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          role: true
        }
      }
    }
  });
};

export const updateStaff = async (id: number, data: any) => {
  return await prisma.staff.update({
    where: { id },
    data
  });
};

export const deleteStaff = async (id: number) => {
  // First find the user associated with this staff
  // Check if staff exists
  const existingStaff = await prisma.staff.findUnique({
    where: { id },
    include: { user: true }
  });
  
  if (!existingStaff) throw new Error("Staff not found");

  return await prisma.$transaction(async (tx) => {
    // If there is an associated user, delete it first (because User holds FK to Staff)
    if (existingStaff.user) {
      await tx.user.delete({
        where: { id: existingStaff.user.id }
      });
    }

    // Then delete the staff
    return await tx.staff.delete({
      where: { id }
    });
  });
};
