import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { Parent } from '../../../types';
import { message } from 'antd';

export const useParents = () => {
  const [data, setData] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchParents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/parents');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar padres');
    } finally {
      setLoading(false);
    }
  }, []);

  const createParent = async (values: any) => {
    try {
      await client.post('/parents', { ...values, username: values.dni, password: values.dni });
      message.success('Padre creado');
      fetchParents();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al crear');
      return false;
    }
  };

  const updateParent = async (id: number, values: any) => {
    try {
      await client.put(`/parents/${id}`, values);
      message.success('Padre actualizado');
      fetchParents();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar');
      return false;
    }
  };

  const deleteParent = async (id: number) => {
    try {
      await client.delete(`/parents/${id}`);
      message.success('Padre eliminado');
      fetchParents();
      return true;
    } catch (error) {
      message.error('Error al eliminar');
      return false;
    }
  };

  return {
    data,
    loading,
    fetchParents,
    createParent,
    updateParent,
    deleteParent
  };
};
