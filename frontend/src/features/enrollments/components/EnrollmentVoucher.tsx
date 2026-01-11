import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Enrollment } from '../../../types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1890ff',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#001529',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#595959',
    marginTop: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '30%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#595959',
  },
  value: {
    width: '70%',
    fontSize: 12,
    color: '#000000',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#8c8c8c',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  statusBadge: {
    padding: 4,
    backgroundColor: '#f6ffed',
    color: '#52c41a',
    borderRadius: 4,
    fontSize: 10,
    alignSelf: 'flex-start',
  }
});

interface EnrollmentVoucherProps {
  enrollment: Enrollment;
}

const EnrollmentVoucher: React.FC<EnrollmentVoucherProps> = ({ enrollment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ACADEMIA TURING</Text>
        <Text style={styles.subtitle}>Comprobante de Matrícula</Text>
      </View>

      {/* Content */}
      <View style={styles.section}>
        
        {/* Student Details */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>Datos del Estudiante</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{enrollment.student ? `${enrollment.student.names} ${enrollment.student.lastName}` : 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DNI:</Text>
            <Text style={styles.value}>{enrollment.student?.dni || 'N/A'}</Text>
          </View>
        </View>

        {/* Enrollment Details */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>Detalles Académicos</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Grupo Asignado:</Text>
            <Text style={styles.value}>{enrollment.group?.name || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Plan de Pago:</Text>
            <Text style={styles.value}>{enrollment.paymentPlan?.name || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Costo:</Text>
            <Text style={styles.value}>{enrollment.paymentPlan?.cost ? `S/ ${enrollment.paymentPlan.cost}` : 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Matrícula:</Text>
            <Text style={styles.value}>
              {(enrollment as any).enrolledAt ? new Date((enrollment as any).enrolledAt).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{enrollment.status}</Text>
          </View>
        </View>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Generado automáticamente por el Sistema Académico Turing</Text>
        <Text>{new Date().toLocaleString()}</Text>
      </View>

    </Page>
  </Document>
);

export default EnrollmentVoucher;
