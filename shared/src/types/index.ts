export type ApiResponse = {
  message: string;
  success: true;
}

export type ServiceItem = {
  id: string;
  descritpion: string;
  rate: number;
  quantity: number;
  subtotal: number;
};

export type Quote = {
  freelancer: { name: string; email: string, company?: string, phone?: string };
  client: { name: string; email: string, company?: string, phone?: string };
  invoiceDetails: {
    invoiceNo: string;
    invoiceDate: string;
    dueDate: string;
  }
  services: ServiceItem[];
};
