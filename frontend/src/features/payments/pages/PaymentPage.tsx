import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Tag, Space, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentVoucher from '../components/PaymentVoucher';
import type { Payment } from '../../../types';
import PaymentForm from '../components/PaymentForm';
import { usePayments } from '../hooks/usePayments';

const PaymentPage: React.FC = () => {
  const { data, loading, fetchPayments, createPayment, updatePayment, deletePayment } = usePayments();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleCreate = () => {
    setEditingPayment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Payment) => {
    setEditingPayment(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deletePayment(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingPayment) {
       success = await updatePayment(editingPayment.id, values);
    } else {
       success = await createPayment(values);
    }
    setFormLoading(false);
    
    if (success) {
      setIsModalVisible(false);
    }
  };

  const filteredData = data.filter(item => 
    item.student?.names.toLowerCase().includes(searchText.toLowerCase()) || 
    item.student?.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Payment> = [
    {
      title: 'Alumno',
      key: 'student',
      render: (_, record) => record.student ? `${record.student.names} ${record.student.lastName}` : 'N/A',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      render: (val) => `S/. ${val}`,
    },
    {
      title: 'Concepto',
      dataIndex: 'concept',
      key: 'concept',
    },
    {
      title: 'Método',
      dataIndex: 'method',
      key: 'method',
      render: (method) => <Tag color="blue">{method}</Tag>,
    },
    {
      title: 'Fecha',
      dataIndex: 'paidAt',
      key: 'paidAt',
      render: (val) => new Date(val).toLocaleDateString(),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <PDFDownloadLink
            document={<PaymentVoucher payment={record} />}
            fileName={`boleta-${record.id}.pdf`}
          >
            {({ loading }) => (
              <Button 
                icon={<FilePdfOutlined />} 
                loading={loading}
                title="Descargar Boleta" 
              />
            )}
          </PDFDownloadLink>
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
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input 
            placeholder="Buscar por alumno" 
            prefix={<SearchOutlined />} 
            style={{ width: 300 }}
            onChange={e => setSearchText(e.target.value)}
          />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Registrar Pago
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingPayment ? "Editar Pago" : "Registrar Pago"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <PaymentForm 
          initialValues={editingPayment}
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default PaymentPage;
