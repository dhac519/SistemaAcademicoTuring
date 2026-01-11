import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import client from '../../api/client';
import type { Staff } from '../../types';

interface StaffFormProps {
  initialValues?: Staff | null;
  onSuccess: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        role: initialValues.user?.role // Flatten role for form
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (initialValues) {
        await client.put(`/staff/${initialValues.id}`, values);
        message.success('Personal actualizado');
      } else {
        // Default password for new staff could be DNI or generic
        await client.post('/staff', { ...values, password: values.dni }); 
        message.success('Personal creado');
      }
      onSuccess();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="names"
        label="Nombres"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Apellidos"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dni"
        label="DNI"
        rules={[{ required: true, message: 'Campo requerido' }, { len: 8, message: 'Debe tener 8 dígitos' }]}
      >
        <Input disabled={!!initialValues} /> 
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: 'email', message: 'Email inválido' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="Usuario"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input disabled={!!initialValues} />
      </Form.Item>

      {!initialValues && (
         <Form.Item
           name="role"
           label="Rol"
           rules={[{ required: true, message: 'Campo requerido' }]}
         >
           <Select>
             <Select.Option value="ADMIN">Administrador</Select.Option>
             <Select.Option value="SECRETARY">Secretaria</Select.Option>
             <Select.Option value="TEACHER">Docente</Select.Option>
           </Select>
         </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StaffForm;
