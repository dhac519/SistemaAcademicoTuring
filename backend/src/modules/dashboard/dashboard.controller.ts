import { Request, Response } from 'express';
import * as dashboardService from './dashboard.service';

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard stats', error });
  }
};
