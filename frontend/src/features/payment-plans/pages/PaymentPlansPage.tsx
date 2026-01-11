import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { PaymentPlan } from '../../../types';
import PaymentPlanForm from '../components/PaymentPlanForm';
import { usePaymentPlans } from '../hooks/usePaymentPlans';

const PaymentPlansPage: React.FC = () => {
  const { data, loading, fetchPaymentPlans, createPaymentPlan, updatePaymentPlan, deletePaymentPlan } = usePaymentPlans();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PaymentPlan | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchPaymentPlans();
  }, [fetchPaymentPlans]);

  const handleCreate = () => {
    setEditingPlan(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: PaymentPlan) => {
    setEditingPlan(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deletePaymentPlan(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingPlan) {
      success = await updatePaymentPlan(editingPlan.id, values);
    } else {
      success = await createPaymentPlan(values);
    }
    setFormLoading(false);
    
    if (success) {
      setIsModalVisible(false);
    }
  };

  const columns: ColumnsType<PaymentPlan> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Costo Total',
      dataIndex: 'cost',
      key: 'cost',
      render: (val) => `S/. ${val}`,
    },
    {
      title: 'Frecuencia (días)',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: 'Cuotas',
      dataIndex: 'installments',
      key: 'installments',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="¿Eliminar?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Nuevo Plan
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingPlan ? "Editar Plan" : "Nuevo Plan"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <PaymentPlanForm 
          initialValues={editingPlan} 
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default PaymentPlansPage;
