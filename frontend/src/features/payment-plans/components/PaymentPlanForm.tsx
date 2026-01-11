import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import type { PaymentPlan } from '../../../types';

interface PaymentPlanFormProps {
  initialValues?: PaymentPlan | null;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const PaymentPlanForm: React.FC<PaymentPlanFormProps> = ({ initialValues, onSubmit, loading }) => {
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
        name="name"
        label="Nombre del Plan"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input placeholder="Ej. Pensión Mensual" />
      </Form.Item>

      <Form.Item
        name="cost"
        label="Costo Total"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <InputNumber style={{ width: '100%' }} prefix="S/." min={0} />
      </Form.Item>

      <Form.Item
        name="frequency"
        label="Frecuencia (días)"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} placeholder="Ej. 30" />
      </Form.Item>

      <Form.Item
        name="installments"
        label="Número de Cuotas"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentPlanForm;
