import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Staff } from '../../../types';
import StaffForm from '../components/StaffForm';
import { useStaff } from '../hooks/useStaff';

const StaffPage: React.FC = () => {
  const { data, loading, fetchStaff, createStaff, updateStaff, deleteStaff } = useStaff();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [searchText, setSearchText] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleCreate = () => {
    setEditingStaff(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Staff) => {
    setEditingStaff(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteStaff(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingStaff) {
      success = await updateStaff(editingStaff.id, values);
    } else {
      success = await createStaff(values);
    }
    setFormLoading(false);
    
    if (success) {
      setIsModalVisible(false);
    }
  };

  const filteredData = data.filter(item => 
    item.names.toLowerCase().includes(searchText.toLowerCase()) || 
    item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.dni.includes(searchText)
  );

  const columns: ColumnsType<Staff> = [
    {
      title: 'Nombre',
      dataIndex: 'names',
      key: 'names',
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      key: 'role',
      render: (_, record) => record.user?.role || 'N/A',
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
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input 
          placeholder="Buscar por nombre o DNI" 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Nuevo Personal
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
        title={editingStaff ? "Editar Personal" : "Nuevo Personal"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <StaffForm 
          initialValues={editingStaff} 
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default StaffPage;
