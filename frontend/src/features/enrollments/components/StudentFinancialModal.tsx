
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Statistic, Table, Tag, Divider, Spin, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import client from '../../../api/client';

interface Props {
  studentId: number | null;
  visible: boolean;
  onCancel: () => void;
}

interface FinancialData {
  studentId: number;
  studentName: string;
  totalDue: number;
  totalPaid: number;
  balance: number;
  enrollments: {
    id: number;
    plan: string;
    cost: number;
  }[];
  payments: {
    id: number;
    amount: number;
    date: string;
    method: string;
  }[];
}

const StudentFinancialModal: React.FC<Props> = ({ studentId, visible, onCancel }) => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && studentId) {
      fetchData(studentId);
    } else {
        setData(null);
    }
  }, [visible, studentId]);

  const fetchData = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get(`/students/${id}/balance`);
      if (!response.data) {
          setError("Recibida respuesta vacía del servidor");
      }
      setData(response.data);
    } catch (error: any) {
      console.error('Error fetching balance:', error);
      setError(error.response?.data?.message || error.message || "Error al cargar datos financieros");
    } finally {
      setLoading(false);
    }
  };

  const paymentColumns: ColumnsType<any> = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (val) => new Date(val).toLocaleDateString(),
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      render: (val) => `S/. ${val.toFixed(2)}`,
    },
    {
      title: 'Método',
      dataIndex: 'method',
      key: 'method',
      render: (val) => <Tag>{val}</Tag>,
    },
  ];

  return (
    <Modal
      title="Detalle Financiero del Estudiante"
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
      destroyOnClose
    >
      {loading && <div style={{ textAlign: 'center', padding: 20 }}><Spin /></div>}
      
      {error && (
        <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
        />
      )}

      {!loading && !error && !data && (
          <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
              No se encontraron datos financieros para este estudiante.
          </div>
      )}
      
      {!loading && data && (
        <>
          <h3 style={{ marginBottom: 20 }}>{data.studentName}</h3>
          
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Statistic
                title="Costo Total Matrículas"
                value={data.totalDue}
                precision={2}
                prefix="S/."
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Total Pagado"
                value={data.totalPaid}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix="S/."
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Deuda Pendiente"
                value={data.balance}
                precision={2}
                valueStyle={{ color: data.balance > 0 ? '#cf1322' : '#3f8600' }}
                prefix="S/."
              />
            </Col>
          </Row>

          <Divider titlePlacement="left">Matrículas Activas</Divider>
          <ul>
            {data.enrollments.map(e => (
                <li key={e.id}>
                    <strong>{e.plan}</strong> - Costo: S/. {e.cost.toFixed(2)}
                </li>
            ))}
          </ul>

          <Divider titlePlacement="left">Historial de Pagos</Divider>
          <Table
            dataSource={data.payments}
            columns={paymentColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            size="small"
          />
        </>
      )}
    </Modal>
  );
};

export default StudentFinancialModal;
