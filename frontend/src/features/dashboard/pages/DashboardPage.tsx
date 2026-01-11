import React from 'react';
import { Row, Col, Typography } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  ReadOutlined, 
  DollarOutlined, 
  SolutionOutlined 
} from '@ant-design/icons';
import StatsCard from '../components/StatsCard';
import { useDashboardStats } from '../hooks/useDashboardStats';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const { stats, loading } = useDashboardStats();

  return (
    <div>
      <Title level={2}>Panel de Control</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard 
            title="Total Alumnos" 
            value={stats?.students || 0} 
            icon={<UserOutlined />} 
            color="#3f8600"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard 
            title="Total Docentes" 
            value={stats?.teachers || 0} 
            icon={<SolutionOutlined />} 
            color="#1890ff"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard 
            title="Grupos Activos" 
            value={stats?.groups || 0} 
            icon={<ReadOutlined />} 
            color="#722ed1"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard 
            title="Total Padres" 
            value={stats?.parents || 0} 
            icon={<TeamOutlined />} 
            color="#fa8c16"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard 
            title="Matrículas Activas" 
            value={stats?.activeEnrollments || 0} 
            icon={<SolutionOutlined />} 
            color="#eb2f96"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard 
            title="Ingresos Totales" 
            value={`S/. ${stats?.totalIncome || 0}`} 
            icon={<DollarOutlined />} 
            color="#cf1322"
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
