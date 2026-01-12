import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Payment } from '../../../types';

// Matching branding colors
const COLORS = {
  primary: '#0050b3', 
  secondary: '#595959',
  lightBg: '#fafafa',
  white: '#ffffff',
  text: '#262626',
  border: '#e8e8e8',
  success: '#3f8600',
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  // HEADER SECTION
  header: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  leftHeader: {
    flexDirection: 'column',
    width: '60%',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  companyInfo: {
    fontSize: 9,
    color: COLORS.secondary,
    marginBottom: 1,
  },
  rightHeader: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  invoiceBox: {
    backgroundColor: COLORS.lightBg,
    padding: 10,
    borderRadius: 4,
    width: '100%',
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    textTransform: 'uppercase',
  },
  invoiceNumber: {
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  dateLabel: {
    fontSize: 9,
    color: COLORS.secondary,
    marginRight: 5,
  },
  dateValue: {
    fontSize: 9,
    fontWeight: 'bold',
  },

  // BILL TO SECTION
  billToSection: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billToCol: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 4,
    marginBottom: 8,
  },
  customerName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  customerDetail: {
    fontSize: 10,
    color: COLORS.text,
    marginBottom: 2,
  },

  // TABLE SECTION
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  th: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  td: {
    color: COLORS.text,
    fontSize: 10,
  },
  colConcept: { width: '50%' },
  colMethod: { width: '25%', textAlign: 'center' },
  colAmount: { width: '25%', textAlign: 'right' },

  // TOTALS SECTION
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalBox: {
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // FOOTER
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  footerLine: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    width: '100%',
    marginBottom: 10,
  }
});

interface PaymentVoucherProps {
  payment: Payment;
}

const PaymentVoucher: React.FC<PaymentVoucherProps> = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.logo}>Academia Turing</Text>
          <Text style={styles.companyInfo}>Dirección: Jr. Silva Santisteban 1271</Text>
          <Text style={styles.companyInfo}>Referencia: A 2 cdras de Plazuela Bolognesi</Text>
          <Text style={styles.companyInfo}>Cel: +51 954430927 | +51 993169980</Text>
        </View>
        <View style={styles.rightHeader}>
           <View style={styles.invoiceBox}>
               <Text style={styles.invoiceLabel}>Recibo de Ingreso</Text>
               <Text style={styles.invoiceNumber}>N° {String(payment.id).padStart(6, '0')}</Text>
               <View style={styles.dateRow}>
                 <Text style={styles.dateLabel}>Fecha:</Text>
                 <Text style={styles.dateValue}>{new Date(payment.paidAt).toLocaleDateString()}</Text>
               </View>
           </View>
        </View>
      </View>

      {/* BILL TO */}
      <View style={styles.billToSection}>
        <View style={styles.billToCol}>
            <Text style={styles.sectionTitle}>Recibido De:</Text>
            <Text style={styles.customerName}>
                {payment.student ? `${payment.student.names} ${payment.student.lastName}` : 'Cliente General'}
            </Text>
            <Text style={styles.customerDetail}>
                DNI: {payment.student?.dni || '-'}
            </Text>
            <Text style={styles.customerDetail}>
                {payment.student?.address || ''}
            </Text>
        </View>
        <View style={styles.billToCol}>
             {/* Can include additional info here if needed */}
        </View>
      </View>

      {/* ITEMS TABLE */}
      <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeader}>
              <Text style={[styles.th, styles.colConcept]}>Descripción / Concepto</Text>
              <Text style={[styles.th, styles.colMethod]}>Método Pago</Text>
              <Text style={[styles.th, styles.colAmount]}>Importe</Text>
          </View>
          {/* Row */}
          <View style={styles.tableRow}>
              <Text style={[styles.td, styles.colConcept]}>{payment.concept}</Text>
              <Text style={[styles.td, styles.colMethod]}>{payment.method}</Text>
              <Text style={[styles.td, styles.colAmount]}>S/ {Number(payment.amount).toFixed(2)}</Text>
          </View>
      </View>

      {/* TOTALS */}
      <View style={styles.totalsSection}>
          <View style={styles.totalBox}>
              <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal:</Text>
                  <Text style={styles.td}>S/ {Number(payment.amount).toFixed(2)}</Text>
              </View>
              {/* No Tax logic provided yet, assuming inclusive or simple receipt */}
              <View style={styles.finalTotalRow}>
                  <Text style={styles.grandTotalLabel}>TOTAL:</Text>
                  <Text style={styles.grandTotalValue}>S/ {Number(payment.amount).toFixed(2)}</Text>
              </View>
          </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
         <View style={styles.footerLine} />
         <Text style={styles.footerText}>Gracias por su pago.</Text>
         <Text style={styles.footerText}>Generado automáticamente por el Sistema Académico Turing</Text>
      </View>

    </Page>
  </Document>
);

export default PaymentVoucher;
