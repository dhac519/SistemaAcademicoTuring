import { useState, useCallback, useEffect } from 'react';
import client from '../../../api/client';
import { message } from 'antd';

export interface DashboardStats {
  students: number;
  teachers: number;
  groups: number;
  parents: number;
  activeEnrollments: number;
  totalIncome: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      message.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    fetchStats
  };
};
