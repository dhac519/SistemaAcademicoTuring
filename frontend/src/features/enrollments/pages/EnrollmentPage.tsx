import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Tag, Input } from 'antd';
import { DeleteOutlined, PlusOutlined, SearchOutlined, EditOutlined, StopOutlined, CheckOutlined, FilePdfOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EnrollmentVoucher from '../components/EnrollmentVoucher';
import type { Enrollment } from '../../../types';
import EnrollmentForm from '../components/EnrollmentForm';
import { useEnrollments } from '../hooks/useEnrollments';
import StudentFinancialModal from '../components/StudentFinancialModal';

const EnrollmentPage: React.FC = () => {
  const { data, loading, fetchEnrollments, createEnrollment, updateEnrollment, updateEnrollmentStatus, deleteEnrollment } = useEnrollments();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(null);
  const [financialModalVisible, setFinancialModalVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const handleCreate = () => {
    setEditingEnrollment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Enrollment) => {
    setEditingEnrollment(record);
    setIsModalVisible(true);
  };

  const handleToggleStatus = async (record: Enrollment) => {
    const newStatus = record.status === 'ACTIVE' ? 'DROPPED' : 'ACTIVE';
    await updateEnrollmentStatus(record.id, newStatus);
  };

  const handleDelete = async (id: number) => {
    await deleteEnrollment(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingEnrollment) {
      success = await updateEnrollment(editingEnrollment.id, values);
    } else {
      success = await createEnrollment(values);
    }
    setFormLoading(false);
    
    if (success) {
      setIsModalVisible(false);
    }
  };

  const handleShowFinancials = (studentId: number) => {
    setSelectedStudentId(studentId);
    setFinancialModalVisible(true);
  };

  const filteredData = data.filter(item => 
    item.student?.names.toLowerCase().includes(searchText.toLowerCase()) || 
    item.student?.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Enrollment> = [
    {
      title: 'Alumno',
      key: 'student',
      render: (_, record) => record.student ? `${record.student.names} ${record.student.lastName}` : 'N/A',
    },
    {
      title: 'Grupo',
      key: 'group',
      render: (_, record) => record.group?.name || 'N/A',
    },
    {
      title: 'Plan de Pago',
      key: 'paymentPlan',
      render: (_, record) => record.paymentPlan?.name || 'N/A',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Fecha',
      dataIndex: 'enrolledAt', // Changed from enrollmentDate which might not exist in backend schema
      key: 'enrolledAt',
      render: (val) => val ? new Date(val).toLocaleDateString() : 'N/A',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <PDFDownloadLink
            document={<EnrollmentVoucher enrollment={record} />}
            fileName={`matricula-${record.student?.dni}.pdf`}
          >
            {({ loading }) => (
              <Button 
                icon={<FilePdfOutlined />} 
                loading={loading}
                title="Descargar Ficha" 
              />
            )}
          </PDFDownloadLink>

          <Button 
            icon={<EyeOutlined />} 
            onClick={() => record.student && handleShowFinancials(record.student.id)} 
            title="Ver Estado Financiero" 
          />

          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} title="Editar" />
          
          <Popconfirm 
            title={record.status === 'ACTIVE' ? "¿Desactivar/Retirar?" : "¿Reactivar?"} 
            onConfirm={() => handleToggleStatus(record)}
          >
             <Button 
                icon={record.status === 'ACTIVE' ? <StopOutlined /> : <CheckOutlined />} 
                title={record.status === 'ACTIVE' ? "Desactivar" : "Reactivar"}
                type={record.status === 'ACTIVE' ? "default" : "primary"}
             />
          </Popconfirm>

          <Popconfirm title="¿Eliminar matrícula?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} title="Eliminar" />
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
          Nueva Matrícula
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
        title={editingEnrollment ? "Editar Matrícula" : "Nueva Matrícula"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={700}
      >
        <EnrollmentForm 
          initialValues={editingEnrollment}
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>

      <StudentFinancialModal
        visible={financialModalVisible}
        studentId={selectedStudentId}
        onCancel={() => setFinancialModalVisible(false)}
      />
    </div>
  );
};

export default EnrollmentPage;
