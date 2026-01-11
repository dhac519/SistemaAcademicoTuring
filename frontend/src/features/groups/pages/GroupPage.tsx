import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Input, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Group } from '../../../types';
import GroupForm from '../components/GroupForm';
import { useGroups } from '../hooks/useGroups';

const GroupPage: React.FC = () => {
  const { data, loading, fetchGroups, createGroup, updateGroup, deleteGroup } = useGroups();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [searchText, setSearchText] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleCreate = () => {
    setEditingGroup(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Group) => {
    setEditingGroup(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteGroup(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingGroup) {
      success = await updateGroup(editingGroup.id, values);
    } else {
      success = await createGroup(values);
    }
    setFormLoading(false);
    
    if (success) {
      setIsModalVisible(false);
    }
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Group> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Docentes',
      key: 'teachers',
      render: (_, record) => (
        record.teachers && record.teachers.length > 0 ? (
          <Space direction="vertical" size="small">
            {record.teachers.map((t: any) => (
               <Tag key={t.id} color="blue">{`${t.names} ${t.lastName}`}</Tag>
            ))}
          </Space>
        ) : <Tag color="red">Sin Asignar</Tag>
      ),
    },
    {
      title: 'Alumnos',
      key: 'count',
      render: (_, record) => record._count?.enrollments || 0,
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
          placeholder="Buscar por nombre" 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Nuevo Grupo
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
        title={editingGroup ? "Editar Grupo" : "Nuevo Grupo"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <GroupForm 
          initialValues={editingGroup} 
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default GroupPage;
