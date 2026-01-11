import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Select, DatePicker, Row, Col, Statistic } from 'antd';
import client from '../../../api/client';
import type { Student } from '../../../types';
import dayjs from 'dayjs';

interface PaymentFormProps {
  onSubmit: (values: any) => void;
  loading?: boolean;
  initialValues?: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, loading, initialValues }) => {
  const [form] = Form.useForm();
  const [balanceInfo, setBalanceInfo] = useState<{ totalDue: number; totalPaid: number; balance: number } | null>(null);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await client.get('/students');
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students');
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        paidAt: initialValues.paidAt ? dayjs(initialValues.paidAt) : dayjs()
      });
      if (initialValues.studentId) {
          handleStudentChange(initialValues.studentId);
      }
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleStudentChange = async (studentId: number) => {
    try {
      setBalanceInfo(null);
      const res = await client.get(`/students/${studentId}/balance`);
      setBalanceInfo(res.data);
    } catch (error) {
      console.error('Error fetching balance');
    }
  };

  const onFinish = (values: any) => {
    onSubmit({
      ...values,
      paidAt: values.paidAt ? values.paidAt.toISOString() : new Date().toISOString()
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        paidAt: dayjs(),
        method: 'CASH'
      }}
    >
      <Form.Item
        name="studentId"
        label="Alumno"
        rules={[{ required: true, message: 'Seleccione un alumno' }]}
      >
        <Select 
          showSearch
          placeholder="Buscar alumno"
          optionFilterProp="children"
          onChange={handleStudentChange}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={students.map(s => ({
            value: s.id,
            label: `${s.names} ${s.lastName} (${s.dni})`
          }))}
        />
      </Form.Item>

      {balanceInfo && (
        <div style={{ marginBottom: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="Deuda Total" value={balanceInfo.totalDue} precision={2} prefix="S/." />
            </Col>
            <Col span={8}>
              <Statistic title="Pagado" value={balanceInfo.totalPaid} precision={2} prefix="S/." />
            </Col>
            <Col span={8}>
              <Statistic 
                title="Saldo Pendiente" 
                value={balanceInfo.balance} 
                precision={2} 
                prefix="S/." 
                valueStyle={{ color: balanceInfo.balance > 0 ? '#cf1322' : '#3f8600' }}
              />
            </Col>
          </Row>
          {currentAmount > 0 && (
            <div style={{ marginTop: 16, borderTop: '1px solid #d9d9d9', paddingTop: 8 }}>
               <Statistic 
                title="Restante (Después de este pago)" 
                value={Math.max(0, balanceInfo.balance - currentAmount)} 
                precision={2} 
                prefix="S/."
                valueStyle={{ color: '#1890ff' }}
               />
            </div>
          )}
        </div>
      )}

      <Form.Item
        name="amount"
        label="Monto a Pagar"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <InputNumber 
            style={{ width: '100%' }} 
            prefix="S/." 
            min={0}
            onChange={(val) => setCurrentAmount(Number(val) || 0)}
        />
      </Form.Item>

      <Form.Item
        name="concept"
        label="Concepto"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input placeholder="Ej. Pensión Marzo" />
      </Form.Item>

      <Form.Item
        name="method"
        label="Método de Pago"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Select>
          <Select.Option value="CASH">Efectivo</Select.Option>
          <Select.Option value="TRANSFER">Transferencia</Select.Option>
          <Select.Option value="CARD">Tarjeta</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="paidAt"
        label="Fecha de Pago"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Registrar Pago
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
