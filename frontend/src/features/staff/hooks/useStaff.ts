import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { Staff } from '../../../types';
import { message } from 'antd';

export const useStaff = () => {
  const [data, setData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/staff');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar personal');
    } finally {
      setLoading(false);
    }
  }, []);

  const createStaff = async (values: any) => {
    try {
      await client.post('/staff', { ...values, password: values.dni });
      message.success('Personal creado');
      fetchStaff();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al crear');
      return false;
    }
  };

  const updateStaff = async (id: number, values: any) => {
    try {
      await client.put(`/staff/${id}`, values);
      message.success('Personal actualizado');
      fetchStaff();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar');
      return false;
    }
  };

  const deleteStaff = async (id: number) => {
    try {
      await client.delete(`/staff/${id}`);
      message.success('Personal eliminado');
      fetchStaff();
      return true;
    } catch (error) {
      message.error('Error al eliminar');
      return false;
    }
  };

  return {
    data,
    loading,
    fetchStaff,
    createStaff,
    updateStaff,
    deleteStaff
  };
};
