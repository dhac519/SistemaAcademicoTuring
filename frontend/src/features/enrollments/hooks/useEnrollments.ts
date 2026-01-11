import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { Enrollment } from '../../../types';
import { message } from 'antd';

export const useEnrollments = () => {
  const [data, setData] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/enrollments');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar matrículas');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEnrollment = async (values: any) => {
    try {
      await client.post('/enrollments', values);
      message.success('Matrícula registrada');
      fetchEnrollments();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al matricular');
      return false;
    }
  };

  const updateEnrollment = async (id: number, values: any) => {
    setLoading(true);
    try {
      await client.put(`/enrollments/${id}`, values);
      message.success('Matrícula actualizada');
      fetchEnrollments();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateEnrollmentStatus = async (id: number, status: string) => {
    try {
      await client.patch(`/enrollments/${id}/status`, { status });
      message.success(`Estado actualizado a ${status}`);
      fetchEnrollments();
      return true;
    } catch (error: any) {
      message.error('Error al actualizar estado');
      return false;
    }
  };

  const deleteEnrollment = async (id: number) => {
    try {
      await client.delete(`/enrollments/${id}`);
      message.success('Matrícula eliminada');
      fetchEnrollments();
      return true;
    } catch (error) {
      message.error('Error al eliminar');
      return false;
    }
  };



  return {
    data,
    loading,
    fetchEnrollments,
    createEnrollment,
    updateEnrollment,
    updateEnrollmentStatus,
    deleteEnrollment
  };
};
