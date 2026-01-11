import { Request, Response } from 'express';
import * as parentService from './parents.service';

export const create = async (req: Request, res: Response) => {
  try {
    const result = await parentService.createParent(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const result = await parentService.getAllParents();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await parentService.getParentById(id);
    if (!result) return res.status(404).json({ message: 'Parent not found' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await parentService.updateParent(id, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await parentService.deleteParent(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
