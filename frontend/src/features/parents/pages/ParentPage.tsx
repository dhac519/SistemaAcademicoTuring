import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Parent } from '../../../types';
import ParentForm from '../components/ParentForm';
import { useParents } from '../hooks/useParents';

const ParentPage: React.FC = () => {
  const { data, loading, fetchParents, createParent, updateParent, deleteParent } = useParents();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [searchText, setSearchText] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchParents();
  }, [fetchParents]);

  const handleCreate = () => {
    setEditingParent(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Parent) => {
    setEditingParent(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteParent(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingParent) {
      success = await updateParent(editingParent.id, values);
    } else {
      success = await createParent(values);
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

  const columns: ColumnsType<Parent> = [
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
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Hijos',
      key: 'children',
      render: (_, record) => record.students ? record.students.length : 0,
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
          Nuevo Padre
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
        title={editingParent ? "Editar Padre" : "Nuevo Padre"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ParentForm 
          initialValues={editingParent} 
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default ParentPage;
