import React from 'react';
import { Card, Statistic } from 'antd';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, loading }) => {
  return (
    <Card loading={loading} hoverable style={{ height: '100%', borderColor: color }}>
      <Statistic
        title={title}
        value={value}
        prefix={icon}
        valueStyle={{ color: color }}
      />
    </Card>
  );
};

export default StatsCard;
