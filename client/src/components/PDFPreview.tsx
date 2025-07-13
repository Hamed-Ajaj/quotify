import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Quote } from "shared";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  bold: { fontWeight: 600 },
});

function QuotePDF({ quote }: { quote: Quote }) {
  const total = quote.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  const tax = total * (quote.taxRate / 100);
  const grandTotal = total + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.bold}>From: {quote.freelancer.name} ({quote.freelancer.email})</Text>
          <Text>To: {quote.client.name} ({quote.client.email})</Text>
        </View>
        <View> <Text>Test</Text></View>
        {quote.items.map(item => (
          <View style={styles.section} key={item.id}>
            <Text>{item.name} - {item.quantity} × ${item.rate} = ${item.quantity * item.rate}</Text>
          </View>
        ))}

        <View style={styles.section}>
          <Text>Tax: {quote.taxRate}% → ${tax.toFixed(2)}</Text>
          <Text>Total: ${grandTotal.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function PDFPreview({ quote }: { quote: Quote }) {
  return (
    <div className="p-4">
      <PDFDownloadLink document={<QuotePDF quote={quote} />} fileName="quote.pdf">
        {({ loading }) => (
          <button className="btn bg-green-500 text-white">
            {loading ? "Preparing..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
