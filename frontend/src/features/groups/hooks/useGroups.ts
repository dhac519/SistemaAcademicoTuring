import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { Group } from '../../../types';
import { message } from 'antd';

export const useGroups = () => {
  const [data, setData] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/groups');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar grupos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createGroup = async (values: any) => {
    try {
      await client.post('/groups', values);
      message.success('Grupo creado');
      fetchGroups();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al crear');
      return false;
    }
  };

  const updateGroup = async (id: number, values: any) => {
    try {
      await client.put(`/groups/${id}`, values);
      message.success('Grupo actualizado');
      fetchGroups();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar');
      return false;
    }
  };

  const deleteGroup = async (id: number) => {
    try {
      await client.delete(`/groups/${id}`);
      message.success('Grupo eliminado');
      fetchGroups();
      return true;
    } catch (error) {
      message.error('Error al eliminar');
      return false;
    }
  };

  return {
    data,
    loading,
    fetchGroups,
    createGroup,
    updateGroup,
    deleteGroup
  };
};
