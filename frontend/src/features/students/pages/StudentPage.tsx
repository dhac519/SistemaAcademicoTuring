import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Input, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Student } from '../../../types';
import StudentForm from '../components/StudentForm';
import { useStudents } from '../hooks/useStudents';

const StudentPage: React.FC = () => {
  const { data, loading, fetchStudents, createStudent, updateStudent, deleteStudent } = useStudents();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchText, setSearchText] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleCreate = () => {
    setEditingStudent(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Student) => {
    setEditingStudent(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
  };

  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    let success = false;
    if (editingStudent) {
      success = await updateStudent(editingStudent.id, values);
    } else {
      success = await createStudent(values);
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

  const columns: ColumnsType<Student> = [
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
      title: 'Padre/Apoderado',
      key: 'parent',
      render: (_, record) => record.parent ? `${record.parent.names} ${record.parent.lastName}` : <Tag color="red">Sin Asignar</Tag>,
    },
    {
      title: 'Fecha Nac.',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (text) => text ? new Date(text).toLocaleDateString() : '',
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
          Nuevo Alumno
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
        title={editingStudent ? "Editar Alumno" : "Nuevo Alumno"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={700}
      >
        <StudentForm 
          initialValues={editingStudent} 
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default StudentPage;
