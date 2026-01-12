import { useState, useCallback } from 'react';
import client from '../../../api/client';
import { notification } from 'antd';

// Definir interfaz aquí si no existe en types/index.ts
export interface DebtReportItem {
  studentId: number;
  names: string;
  lastName: string;
  dni: string;
  parentName: string;
  parentPhone: string;
  totalTuition: number;
  totalPaid: number;
  debt: number;
  status: 'PAID' | 'PARTIAL' | 'DEBT';
}

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [debtsReport, setDebtsReport] = useState<DebtReportItem[]>([]);

  const fetchDebtsReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/reports/debts');
      setDebtsReport(response.data);
    } catch (error) {
      console.error('Error fetching debts report:', error);
      notification.error({
        message: 'Error al cargar reporte',
        description: 'No se pudo obtener el reporte de deudas.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    debtsReport,
    loading,
    fetchDebtsReport
  };
};
