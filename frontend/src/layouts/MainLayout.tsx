import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  DollarOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  SolutionOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/students',
      icon: <UserOutlined />,
      label: 'Alumnos',
    },
    {
      key: '/parents',
      icon: <TeamOutlined />,
      label: 'Padres',
    },
    {
      key: '/staff',
      icon: <SolutionOutlined />,
      label: 'Personal',
    },
    {
      key: '/groups',
      icon: <BankOutlined />,
      label: 'Grupos',
    },
    {
      key: '/enrollments',
      icon: <ScheduleOutlined />,
      label: 'Matrículas',
    },
    {
      key: '/payment-plans',
      icon: <BankOutlined />,
      label: 'Planes de Pago',
    },
    {
      key: '/payments',
      icon: <DollarOutlined />,
      label: 'Pagos',
    },
    {
      key: '/reports/debts',
      icon: <DollarOutlined />,
      label: 'Reporte Deudas',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ 
          height: 32, 
          margin: 16, 
          // background: 'rgba(255, 255, 255, 0.2)', 
          textAlign: 'center',
          color: '#fff',
          fontWeight: 'bold',
          lineHeight: '32px',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}>
          ACADEMIA TURING
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Salir
          </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
