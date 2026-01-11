import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { Payment } from '../../../types';
import { message } from 'antd';

export const usePayments = () => {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/payments');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar pagos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPayment = async (values: any) => {
    try {
      await client.post('/payments', values);
      message.success('Pago registrado');
      fetchPayments();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al registrar pago');
      return false;
    }
  };

  const updatePayment = async (id: number, values: any) => {
    setLoading(true);
    try {
      await client.put(`/payments/${id}`, values);
      message.success('Pago actualizado correctamente');
      fetchPayments();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar pago');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id: number) => {
    try {
      await client.delete(`/payments/${id}`);
      message.success('Pago eliminado correctamente');
      fetchPayments();
      return true;
    } catch (error: any) {
      message.error('Error al eliminar pago');
      return false;
    }
  };

  return {
    data,
    loading,
    fetchPayments,
    createPayment,
    updatePayment,
    deletePayment
  };
};
