import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import client from '../../../api/client';
import type { Group, Staff } from '../../../types';

interface GroupFormProps {
  initialValues?: Group | null;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const GroupForm: React.FC<GroupFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await client.get('/staff'); 
        // Filter only teachers? The backend list returns all staff.
        // For now list all staff, or filter if role available.
        // Staff type has user.role but backend /staff returns Staff[] which includes user relation.
        const teachersOnly = res.data.filter((s: Staff) => s.user?.role === 'TEACHER');
        setTeachers(teachersOnly);
      } catch (error) {
        console.error('Error fetching teachers');
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        teacherIds: initialValues.teachers?.map((t: any) => t.id) || []
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Nombre del Grupo"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input placeholder="Ej. 1ro Secundaria A" />
      </Form.Item>

      <Form.Item
        name="teacherIds"
        label="Docentes Encargados"
        rules={[{ required: true, message: 'Debe seleccionar al menos un docente' }]}
      >
        <Select 
          mode="multiple"
          placeholder="Seleccionar docentes"
          options={teachers.map(t => ({
            value: t.id,
            label: `${t.names} ${t.lastName}`
          }))}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GroupForm;
