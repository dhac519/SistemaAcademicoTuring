import { Request, Response } from 'express';
import * as reportsService from './reports.service';

export const getDebtsReport = async (req: Request, res: Response) => {
  try {
    const report = await reportsService.getDebtsReport();
    res.json(report);
  } catch (error) {
    console.error('Error getting debts report:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
