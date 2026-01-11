import { Request, Response } from 'express';
import * as studentService from './students.service';

export const create = async (req: Request, res: Response) => {
  try {
    const result = await studentService.createStudent(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudents();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await studentService.getStudentById(id);
    if (!result) return res.status(404).json({ message: 'Student not found' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await studentService.updateStudent(id, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await studentService.deleteStudent(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await studentService.getStudentBalance(id);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
