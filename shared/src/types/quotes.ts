
export type ServiceItem = {
  id: string;
  name: string;
  rate: number;
  quantity: number;
};

export type Quote = {
  freelancer: { name: string; email: string };
  client: { name: string; email: string };
  items: ServiceItem[];
  taxRate: number;
};
