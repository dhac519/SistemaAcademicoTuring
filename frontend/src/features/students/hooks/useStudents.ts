import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { Student } from '../../../types';
import { message } from 'antd';

export const useStudents = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/students');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar alumnos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudent = async (values: any) => {
    try {
      // Logic from original form: password = dni defaults handled in backend or here?
      // Form handled defaults. Backend handles password creation if not sent? 
      // Actually backend createStudent expects password.
      // Let's ensure payload is correct.
      await client.post('/students', values);
      message.success('Alumno creado');
      fetchStudents();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al crear');
      return false;
    }
  };

  const updateStudent = async (id: number, values: any) => {
    try {
      await client.put(`/students/${id}`, values);
      message.success('Alumno actualizado');
      fetchStudents();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar');
      return false;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await client.delete(`/students/${id}`);
      message.success('Alumno eliminado');
      fetchStudents();
      return true;
    } catch (error) {
      message.error('Error al eliminar');
      return false;
    }
  };

  return {
    data,
    loading,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent
  };
};
