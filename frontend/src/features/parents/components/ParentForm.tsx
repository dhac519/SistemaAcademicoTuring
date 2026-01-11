import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import type { Parent } from '../../../types';

interface ParentFormProps {
  initialValues?: Parent | null;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const ParentForm: React.FC<ParentFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
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
        name="phone"
        label="Teléfono"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ParentForm;
