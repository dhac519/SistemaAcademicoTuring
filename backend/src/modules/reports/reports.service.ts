import prisma from '../../config/prisma';

export const getDebtsReport = async () => {
  // 1. Obtener todos los alumnos con sus matrículas (planes de pago) y pagos realizados
  const students = await prisma.student.findMany({
    include: {
      enrollments: {
        where: { status: 'ACTIVE' },
        include: {
          paymentPlan: true
        }
      },
      payments: true,
      parent: true
    }
  });

  // 2. Procesar cada alumno para calcular deuda
  const report = students.map(student => {
    let totalTuition = 0; // Total que debería pagar por sus matrículas activas
    let totalPaid = 0;    // Total que ha pagado

    // Sumar costos de matrícula
    student.enrollments.forEach(enrollment => {
      if (enrollment.paymentPlan) {
        totalTuition += Number(enrollment.paymentPlan.cost);
      }
    });

    // Sumar pagos realizados
    student.payments.forEach(payment => {
      totalPaid += Number(payment.amount);
    });

    const debt = totalTuition - totalPaid;

    let status = 'PAID';
    if (debt > 0) {
      if (totalPaid > 0) status = 'PARTIAL'; // Ha pagado algo pero debe
      else status = 'DEBT'; // No ha pagado nada
    }

    return {
      studentId: student.id,
      names: student.names,
      lastName: student.lastName,
      dni: student.dni,
      parentName: student.parent ? `${student.parent.names} ${student.parent.lastName}` : 'N/A',
      parentPhone: student.parent?.phone || 'N/A',
      totalTuition,
      totalPaid,
      debt: debt > 0 ? debt : 0, // No mostrar deuda negativa (saldo a favor)
      status
    };
  });

  // 3. Filtrar o devolver todos (se puede agregar lógica para devolver solo deudores si se quiere)
  return report;
};
