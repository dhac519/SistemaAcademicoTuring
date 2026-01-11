import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Payment } from '../../../types';

// Reuse styles from EnrollmentVoucher for consistency
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
  totalRow: {
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  totalLabel: {
    width: '70%',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 10,
  },
  totalValue: {
    width: '30%',
    fontSize: 14,
    fontWeight: 'bold',
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
  }
});

interface PaymentVoucherProps {
  payment: Payment;
}

const PaymentVoucher: React.FC<PaymentVoucherProps> = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ACADEMIA TURING</Text>
        <Text style={styles.subtitle}>Comprobante de Pago</Text>
        <Text style={{ fontSize: 10, textAlign: 'right', marginTop: 10 }}>Recibo N°: {String(payment.id).padStart(6, '0')}</Text>
      </View>

      {/* Content */}
      <View style={styles.section}>
        
        {/* Student Details */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>Datos del Estudiante</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{payment.student ? `${payment.student.names} ${payment.student.lastName}` : 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DNI:</Text>
            <Text style={styles.value}>{payment.student?.dni || 'N/A'}</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>Detalles del Pago</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Concepto:</Text>
            <Text style={styles.value}>{payment.concept}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Método:</Text>
            <Text style={styles.value}>{payment.method}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>
              {new Date(payment.paidAt).toLocaleString()}
            </Text>
          </View>
           {/* Conditional rendering for Operation Code if available in type/schema */}
           {/* Assuming Payment type might have operationCode or similar if added later, 
               but based on current types.ts:
               export interface Payment {
                  id: number;
                  studentId: number;
                  student?: Student;
                  amount: number;
                  concept: string;
                  method: string;
                  paidAt: string;
                }
               It doesn't have operacionCode in frontend type yet, so skipping or check schema.
               Backend schema has: operationCode String?
            */}
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL PAGADO:</Text>
          <Text style={styles.totalValue}>S/ {Number(payment.amount).toFixed(2)}</Text>
        </View>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Gracias por su pago.</Text>
        <Text>Generado automáticamente por el Sistema Académico Turing</Text>
      </View>

    </Page>
  </Document>
);

export default PaymentVoucher;
