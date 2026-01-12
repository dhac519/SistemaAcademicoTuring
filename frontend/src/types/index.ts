export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'SECRETARY' | 'TEACHER' | 'STUDENT' | 'PARENT';
  isActive: boolean;
}

export interface Staff {
  id: number;
  names: string;
  lastName: string;
  dni: string;
  email?: string;
  phone?: string;
  address?: string;
  user?: User;
}

export interface Student {
  id: number;
  names: string;
  lastName: string;
  dni: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  grade?: string;
  schoolName?: string;
  user?: User;
  parent?: Parent;
}

export interface Parent {
  id: number;
  names: string;
  lastName: string;
  dni: string;
  phone: string;
  email?: string;
  user?: User;
  students?: Student[];
}

export interface Group {
  id: number;
  name: string;
  teachers?: Staff[];
  enrollments?: Enrollment[];
  _count?: {
    enrollments: number;
  };
}

export interface Enrollment {
  id: number;
  studentId: number;
  student?: Student;
  groupId: number;
  group?: Group;
  paymentPlanId: number;
  paymentPlan?: PaymentPlan;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'PENDING';
  enrollmentDate: string;
}

export interface PaymentPlan {
  id: number;
  name: string;
  cost: number; // DB field is cost
  frequency: number; // Changed to number based on form input
  installments: number;
}

export interface Payment {
  id: number;
  studentId: number;
  student?: Student;
  amount: number;
  concept: string;
  method: string;
  paidAt: string;
}
