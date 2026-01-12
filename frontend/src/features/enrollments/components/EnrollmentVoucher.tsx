import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Enrollment } from '../../../types';

// Define styling constants
const COLORS = {
  primary: '#0050b3', // Dark Blue
  secondary: '#595959', // Dark Gray
  lightBg: '#fafafa', // Light Gray Background
  white: '#ffffff',
  text: '#262626',
  border: '#e8e8e8',
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyBox: {
    flexDirection: 'column',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'heavy',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  companyDetails: {
    fontSize: 9,
    color: COLORS.secondary,
  },
  invoiceBox: {
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  invoiceDetail: {
    fontSize: 10,
    color: COLORS.secondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 10,
    paddingBottom: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoCol: {
    width: '50%',
    marginBottom: 6,
    flexDirection: 'column',
  },
  label: {
    fontSize: 9,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: COLORS.text,
  },
  // Table Styles
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: COLORS.lightBg,
  },
  tableCol: {
    width: '25%', // 4 columns
    paddingHorizontal: 8,
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  tableCell: {
    fontSize: 10,
  },
  badge: {
    padding: '2 6',
    borderRadius: 4,
    backgroundColor: COLORS.lightBg,
    fontSize: 8,
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#bfbfbf',
    marginBottom: 2,
  }
});

interface EnrollmentVoucherProps {
  enrollment: Enrollment;
}

const EnrollmentVoucher: React.FC<EnrollmentVoucherProps> = ({ enrollment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.companyBox}>
          <Text style={styles.logo}>Academia Turing</Text>
          <Text style={styles.companyDetails}>Educación Pre-Universitaria de Calidad</Text>
          <Text style={styles.companyDetails}>Jr. Silva Santisteban 1271 (A 2 cuadras de Plazuela Bolognesi)</Text>
          <Text style={styles.companyDetails}>Tel: +51 954430927 | +51 993169980</Text>
        </View>
        <View style={styles.invoiceBox}>
          <Text style={styles.invoiceTitle}>Ficha de Matrícula</Text>
          <Text style={styles.invoiceDetail}>N° Matrícula: {String(enrollment.id).padStart(6, '0')}</Text>
          <Text style={styles.invoiceDetail}>Fecha: {new Date(enrollment.enrollmentDate || new Date()).toLocaleDateString()}</Text>
        </View>
      </View>

      {/* STUDENT INFO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Estudiante</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Apellidos y Nombres:</Text>
            <Text style={styles.value}>{enrollment.student ? `${enrollment.student.names} ${enrollment.student.lastName}` : 'Desconocido'}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.label}>DNI:</Text>
            <Text style={styles.value}>{enrollment.student?.dni || '-'}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{enrollment.student?.address || '-'}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{enrollment.student?.phone || '-'}</Text>
          </View>
           <View style={styles.infoCol}>
            <Text style={styles.label}>Colegio de Procedencia:</Text>
            <Text style={styles.value}>{enrollment.student?.schoolName || '-'}</Text>
          </View>
           <View style={styles.infoCol}>
            <Text style={styles.label}>Grado / Año:</Text>
            <Text style={styles.value}>{enrollment.student?.grade || '-'}</Text>
          </View>
        </View>
      </View>

      {/* ACADEMIC DETAILS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Académica</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Grupo / Aula</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Plan de Pago</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Costo del Plan</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Estado</Text></View>
          </View>
          <View style={styles.tableRow}>
             <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{enrollment.group?.name || '-'}</Text>
             </View>
             <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{enrollment.paymentPlan?.name || '-'}</Text>
             </View>
             <View style={styles.tableCol}>
                <Text style={styles.tableCell}>S/ {Number(enrollment.paymentPlan?.cost || 0).toFixed(2)}</Text>
             </View>
             <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{enrollment.status}</Text>
             </View>
          </View>
        </View>
      </View>

      {/* NOTES AREA */}
      <View style={[styles.section, { marginTop: 20 }]}>
         <Text style={styles.label}>Observaciones:</Text>
         <Text style={[styles.value, { fontSize: 9, fontStyle: 'italic', marginTop: 4 }]}>
            El estudiante se compromete a cumplir con el reglamento interno de la institución.
            La asistencia es obligatoria y se tomará en cuenta para el desempeño académico.
         </Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Generado automáticamente por el Sistema Académico Turing</Text>
        <Text style={styles.footerText}>{new Date().toLocaleString()}</Text>
      </View>

    </Page>
  </Document>
);

export default EnrollmentVoucher;
