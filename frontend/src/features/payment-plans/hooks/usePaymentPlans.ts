import { useState, useCallback } from 'react';
import client from '../../../api/client';
import type { PaymentPlan } from '../../../types';
import { message } from 'antd';

export const usePaymentPlans = () => {
  const [data, setData] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPaymentPlans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/payment-plans');
      setData(response.data);
    } catch (error) {
      message.error('Error al cargar planes de pago');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPaymentPlan = async (values: any) => {
    try {
      await client.post('/payment-plans', values);
      message.success('Plan de pago creado');
      fetchPaymentPlans();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al crear');
      return false;
    }
  };

  const updatePaymentPlan = async (id: number, values: any) => {
    try {
      await client.put(`/payment-plans/${id}`, values);
      message.success('Plan de pago actualizado');
      fetchPaymentPlans();
      return true;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al actualizar');
      return false;
    }
  };

  const deletePaymentPlan = async (id: number) => {
    try {
      await client.delete(`/payment-plans/${id}`);
      message.success('Plan de pago eliminado');
      fetchPaymentPlans();
      return true;
    } catch (error) {
      message.error('Error al eliminar');
      return false;
    }
  };

  return {
    data,
    loading,
    fetchPaymentPlans,
    createPaymentPlan,
    updatePaymentPlan,
    deletePaymentPlan
  };
};
