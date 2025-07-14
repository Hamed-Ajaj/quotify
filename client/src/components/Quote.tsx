import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from "@david.kucsai/react-pdf-table";
import { Quote } from "shared";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
const QuoteComponent = ({ quote, handleBackToForm }: { quote: Quote, handleBackToForm: () => void; }) => {

  const total = quote.services.reduce((sum, item) => sum + item.subtotal, 0);

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.5
    },
    header: {
      backgroundColor: '#f8f9fa',
      borderWidth: 2,
      borderColor: '#2c3e50',
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 30,
      textAlign: 'center',
      borderRadius: 5
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2c3e50',
      letterSpacing: 1
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#34495e',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    contactInfo: {
      backgroundColor: '#fff',
      border: '1px solid #e9ecef',
      padding: 12,
      borderRadius: 3,
      marginBottom: 20
    },
    contactText: {
      fontSize: 11,
      color: '#495057',
      marginBottom: 3
    },
    invoiceDetails: {
      backgroundColor: '#f8f9fa',
      padding: 12,
      marginBottom: 25,
      borderRadius: 3,
      border: '1px solid #dee2e6'
    },
    detailRow: {
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'center'
    },
    detailLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#495057',
      width: 100
    },
    detailValue: {
      fontSize: 12,
      color: '#212529'
    },
    tableContainer: {
      marginTop: 20,
      marginBottom: 20
    },
    tableHeader: {
      backgroundColor: '#2c3e50',
      color: '#ffffff',
      fontWeight: 'bold',
      padding: 8,
      fontSize: 11
    },
    tableCell: {
      padding: 8,
      fontSize: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#dee2e6',
      borderBottomStyle: 'solid'
    },
    totalRow: {
      backgroundColor: '#e9ecef',
      fontWeight: 'bold',
      fontSize: 12
    },
    totalLabel: {
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#2c3e50'
    },
    totalAmount: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#27ae60'
    },
    footer: {
      marginTop: 30,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#dee2e6',
      textAlign: 'center'
    },
    footerText: {
      fontSize: 10,
      color: '#6c757d'
    }
  });

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Button onClick={handleBackToForm} className="my-8">
        <ArrowLeft size={16} className="mr-2" />
        <span className="sr-only">Back</span>
      </Button>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.headerText}>QUOTE</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
              <View style={{ width: '45%' }}>
                <Text style={styles.sectionTitle}>From:</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactText, { fontWeight: 'bold', fontSize: 12 }]}>
                    {quote.freelancer.name}
                  </Text>
                  <Text style={styles.contactText}>{quote.freelancer.company}</Text>
                  <Text style={styles.contactText}>{quote.freelancer.email}</Text>
                  <Text style={styles.contactText}>{quote.freelancer.phone}</Text>
                </View>
              </View>

              <View style={{ width: '45%' }}>
                <Text style={styles.sectionTitle}>To:</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactText, { fontWeight: 'bold', fontSize: 12 }]}>
                    {quote.client.name}
                  </Text>
                  <Text style={styles.contactText}>{quote.client.company}</Text>
                  <Text style={styles.contactText}>{quote.client.email}</Text>
                  <Text style={styles.contactText}>{quote.client.phone}</Text>
                </View>
              </View>
            </View>

            <View style={styles.invoiceDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quote No:</Text>
                <Text style={styles.detailValue}>{quote.invoiceDetails.invoiceNo}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quote Date:</Text>
                <Text style={styles.detailValue}>{quote.invoiceDetails.invoiceDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Valid Until:</Text>
                <Text style={styles.detailValue}>{quote.invoiceDetails.dueDate}</Text>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <Table data={quote.services}>
                <TableHeader textAlign={"center"}>
                  <TableCell style={[styles.tableHeader, { width: '40%' }]}>Description</TableCell>
                  <TableCell style={[styles.tableHeader, { width: '20%' }]}>Rate</TableCell>
                  <TableCell style={[styles.tableHeader, { width: '20%' }]}>Quantity</TableCell>
                  <TableCell style={[styles.tableHeader, { width: '20%' }]}>Subtotal</TableCell>
                </TableHeader>
                <TableBody>
                  <DataTableCell
                    style={styles.tableCell}
                    getContent={(r) => r.description}
                  />
                  <DataTableCell
                    style={[styles.tableCell, { textAlign: 'center' }]}
                    getContent={(r) => `$${r.rate}/h`}
                  />
                  <DataTableCell
                    style={[styles.tableCell, { textAlign: 'center' }]}
                    getContent={(r) => `${r.quantity}h`}
                  />
                  <DataTableCell
                    style={[styles.tableCell, { textAlign: 'right' }]}
                    getContent={(r) => `$${r.subtotal.toFixed(2)}`}
                  />
                </TableBody>
              </Table>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
              <View style={{ width: '40%' }}>
                <View style={[styles.totalRow, { padding: 12, borderRadius: 3 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.totalLabel}>TOTAL:</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Thank you for considering our services! This quote is valid until the specified date.
              </Text>
              <Text style={[styles.footerText, { marginTop: 5 }]}>
                For questions about this quote, please contact {quote.freelancer.email}
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default QuoteComponent;
