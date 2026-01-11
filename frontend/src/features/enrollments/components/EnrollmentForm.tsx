import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Row, Col } from 'antd';
import client from '../../../api/client';
import type { Student, Group, PaymentPlan } from '../../../types';

interface EnrollmentFormProps {
  onSubmit: (values: any) => void;
  loading?: boolean;
  initialValues?: any;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onSubmit, loading, initialValues }) => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [plans, setPlans] = useState<PaymentPlan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resStudents, resGroups, resPlans] = await Promise.all([
          client.get('/students'),
          client.get('/groups'),
          client.get('/payment-plans')
        ]);
        setStudents(resStudents.data);
        setGroups(resGroups.data);
        setPlans(resPlans.data);
      } catch (error) {
        console.error('Error loading form data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialValues) {
      // For editing, we might need to map fields if they differ
      form.setFieldsValue({
          ...initialValues,
          paymentPlanId: initialValues.paymentPlan?.id ?? initialValues.paymentPlanId, // Ensure we use the ID
          groupId: initialValues.group?.id ?? initialValues.groupId
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
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="studentId"
            label="Alumno"
            rules={[{ required: true, message: 'Seleccione un alumno' }]}
          >
            <Select 
              showSearch
              placeholder="Buscar alumno"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={students.map(s => ({
                value: s.id,
                label: `${s.names} ${s.lastName} (${s.dni})`
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="groupId"
            label="Grupo"
            rules={[{ required: true, message: 'Seleccione un grupo' }]}
          >
            <Select 
              placeholder="Seleccionar grupo"
              options={groups.map(g => ({
                value: g.id,
                label: g.name
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
           <Form.Item
            name="paymentPlanId"
            label="Plan de Pago"
            rules={[{ required: true, message: 'Seleccione un plan' }]}
          >
            <Select 
              placeholder="Seleccionar plan"
              options={plans.map(p => ({
                value: p.id,
                label: `${p.name} (S/. ${p.cost})`
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Matricular
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EnrollmentForm;
