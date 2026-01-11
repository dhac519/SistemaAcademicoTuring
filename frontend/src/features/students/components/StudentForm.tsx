import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import client from '../../../api/client';
import type { Student, Parent } from '../../../types';
import ParentForm from '../../parents/components/ParentForm';
import dayjs from 'dayjs';

interface StudentFormProps {
  initialValues?: Student | null;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [creatingParent, setCreatingParent] = useState(false);
  const [parents, setParents] = useState<Parent[]>([]);

  const fetchParents = async () => {
    try {
      const res = await client.get('/parents');
      setParents(res.data);
    } catch (error) {
      console.error('Error fetching parents');
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const handleCreateParent = async (values: any) => {
    setCreatingParent(true);
    try {
      const res = await client.post('/parents', {
        ...values,
        username: values.dni,
        password: values.dni,
      });
      message.success('Apoderado creado exitosamente');
      await fetchParents(); // Reload list
      setModalVisible(false);
      // Auto-select the new parent
      form.setFieldsValue({ parentId: res.data.id });
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al crear apoderado');
    } finally {
      setCreatingParent(false);
    }
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birthDate: initialValues.birthDate ? dayjs(initialValues.birthDate) : null,
        parentId: initialValues.parent?.id
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    onSubmit({
       ...values,
       birthDate: values.birthDate ? values.birthDate.toISOString() : null,
       ...(!initialValues && { 
         username: values.dni,
         password: values.dni 
       })
    });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="names"
              label="Nombres"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Apellidos"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dni"
              label="DNI"
              rules={[{ required: true, message: 'Campo requerido' }, { len: 8, message: 'Debe tener 8 dígitos' }]}
            >
              <Input disabled={!!initialValues} /> 
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="birthDate"
              label="Fecha de Nacimiento"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="address"
          label="Dirección"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Apoderado (Padre)">
            <Row gutter={8}>
                <Col flex="auto">
                    <Form.Item
                        name="parentId"
                        noStyle
                        rules={[{ required: true, message: 'Debe seleccionar un apoderado' }]}
                    >
                        <Select 
                        showSearch
                        placeholder="Buscar apoderado por nombre o DNI"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={parents.map(p => ({
                            value: p.id,
                            label: `${p.names} ${p.lastName} (${p.dni})`
                        }))}
                        />
                    </Form.Item>
                </Col>
                <Col flex="none">
                    <Button 
                        type="dashed" 
                        icon={<PlusOutlined />} 
                        onClick={() => setModalVisible(true)}
                    >
                        Nuevo
                    </Button>
                </Col>
            </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Guardar
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Registrar Nuevo Apoderado"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ParentForm 
            onSubmit={handleCreateParent}
            loading={creatingParent}
        />
      </Modal>
    </>
  );
};

export default StudentForm;
