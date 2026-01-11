import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import type { Staff } from '../../../types';

interface StaffFormProps {
  initialValues?: Staff | null;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const StaffForm: React.FC<StaffFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        role: initialValues.user?.role
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
