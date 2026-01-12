import React, { useEffect, useState } from 'react';
import { Table, Input, Tag, Card, Row, Col, Statistic, Button } from 'antd';
import { SearchOutlined, DollarOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useReports, type DebtReportItem } from '../hooks/useReports';

const DebtsPage: React.FC = () => {
  const { debtsReport, loading, fetchDebtsReport } = useReports();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchDebtsReport();
  }, [fetchDebtsReport]);

  const filteredData = debtsReport.filter(item => 
    item.names.toLowerCase().includes(searchText.toLowerCase()) || 
    item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.dni.includes(searchText)
  );

  // Calcular totales generales
  const totalDebt = debtsReport.reduce((acc, curr) => acc + curr.debt, 0);
  const totalPaid = debtsReport.reduce((acc, curr) => acc + curr.totalPaid, 0);
  const totalPotential = totalDebt + totalPaid;

  const columns: ColumnsType<DebtReportItem> = [
    {
      title: 'Alumno',
      key: 'student',
      render: (_, record) => `${record.names} ${record.lastName}`,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Padre/Apoderado',
      dataIndex: 'parentName',
      key: 'parentName',
    },
    {
      title: 'Costo Total',
      dataIndex: 'totalTuition',
      key: 'totalTuition',
      render: (val) => `S/. ${val.toFixed(2)}`,
    },
    {
      title: 'Pagado',
      dataIndex: 'totalPaid',
      key: 'totalPaid',
      render: (val) => <span style={{ color: 'green' }}>S/. {val.toFixed(2)}</span>,
    },
    {
      title: 'Deuda',
      dataIndex: 'debt',
      key: 'debt',
      render: (val) => <span style={{ color: val > 0 ? 'red' : 'black', fontWeight: val > 0 ? 'bold' : 'normal' }}>S/. {val.toFixed(2)}</span>,
      sorter: (a, b) => a.debt - b.debt,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        let text = 'AL DÍA';
        if (status === 'DEBT') {
          color = 'red';
          text = 'DEUDA TOTAL';
        } else if (status === 'PARTIAL') {
          color = 'orange';
          text = 'PARCIAL';
        }
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: 'Al Día', value: 'PAID' },
        { text: 'Parcial', value: 'PARTIAL' },
        { text: 'Deuda Total', value: 'DEBT' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Deuda Total Pendiente"
              value={totalDebt}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<DollarOutlined />}
              suffix="PEN"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Recaudado"
              value={totalPaid}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="PEN"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Proyección Total"
              value={totalPotential}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="PEN"
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input 
          placeholder="Buscar por nombre o DNI" 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button icon={<ReloadOutlined />} onClick={fetchDebtsReport}>
          Actualizar
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="studentId" 
        loading={loading} 
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};

export default DebtsPage;
