import { useState } from 'react';
import { Trash2, Plus, User, Mail, Calculator, FileText } from 'lucide-react';

// Mock types (replace with your actual shared types)
interface ServiceItem {
  id: string;
  name: string;
  rate: number;
  quantity: number;
}

interface Quote {
  freelancer: { name: string; email: string };
  client: { name: string; email: string };
  items: ServiceItem[];
  taxRate: number;
}

export default function QuoteForm({ onSubmit }: { onSubmit: (quote: Quote) => void }) {
  const [freelancer, setFreelancer] = useState({ name: "", email: "" });
  const [client, setClient] = useState({ name: "", email: "" });
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [taxRate, setTaxRate] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), name: "", rate: 0, quantity: 1 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof ServiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!freelancer.name.trim()) newErrors.freelancerName = "Freelancer name is required";
    if (!freelancer.email.trim()) newErrors.freelancerEmail = "Freelancer email is required";
    else if (!/\S+@\S+\.\S+/.test(freelancer.email)) newErrors.freelancerEmail = "Invalid email format";

    if (!client.name.trim()) newErrors.clientName = "Client name is required";
    if (!client.email.trim()) newErrors.clientEmail = "Client email is required";
    else if (!/\S+@\S+\.\S+/.test(client.email)) newErrors.clientEmail = "Invalid email format";

    if (items.length === 0) newErrors.items = "At least one service item is required";
    else {
      items.forEach((item, index) => {
        if (!item.name.trim()) newErrors[`item${index}Name`] = "Service name is required";
        if (item.rate <= 0) newErrors[`item${index}Rate`] = "Rate must be greater than 0";
        if (item.quantity <= 0) newErrors[`item${index}Quantity`] = "Quantity must be greater than 0";
      });
    }

    if (taxRate < 0 || taxRate > 100) newErrors.taxRate = "Tax rate must be between 0 and 100";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ freelancer, client, items, taxRate });
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.rate * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Invoice</h1>
        <p className="text-gray-600">Fill in the details below to generate your professional invoice</p>
      </div>

      <div className="space-y-8">
        {/* Freelancer Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Your Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={freelancer.name}
                onChange={e => setFreelancer({ ...freelancer, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.freelancerName ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.freelancerName && <p className="text-red-500 text-xs mt-1">{errors.freelancerName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={freelancer.email}
                onChange={e => setFreelancer({ ...freelancer, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.freelancerEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.freelancerEmail && <p className="text-red-500 text-xs mt-1">{errors.freelancerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Client Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                placeholder="Acme Corporation"
                value={client.name}
                onChange={e => setClient({ ...client, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.clientName ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
              <input
                type="email"
                placeholder="contact@acme.com"
                value={client.email}
                onChange={e => setClient({ ...client, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.clientEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Services</h2>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Service
            </button>
          </div>

          {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="bg-white p-4 rounded-md border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                    <input
                      type="text"
                      placeholder="Website Development"
                      value={item.name}
                      onChange={e => updateItem(item.id, "name", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[`item${index}Name`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors[`item${index}Name`] && <p className="text-red-500 text-xs mt-1">{errors[`item${index}Name`]}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rate ($)</label>
                    <input
                      type="number"
                      placeholder="50"
                      value={item.rate || ''}
                      onChange={e => updateItem(item.id, "rate", +e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[`item${index}Rate`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors[`item${index}Rate`] && <p className="text-red-500 text-xs mt-1">{errors[`item${index}Rate`]}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      placeholder="1"
                      value={item.quantity || ''}
                      onChange={e => updateItem(item.id, "quantity", +e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[`item${index}Quantity`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors[`item${index}Quantity`] && <p className="text-red-500 text-xs mt-1">{errors[`item${index}Quantity`]}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                      ${(item.rate * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-6 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax and Summary Section */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Calculator className="h-5 w-5 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Tax & Summary</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                placeholder="10"
                value={taxRate || ''}
                onChange={e => setTaxRate(+e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.taxRate ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.taxRate && <p className="text-red-500 text-xs mt-1">{errors.taxRate}</p>}
            </div>

            <div className="bg-white p-4 rounded-md border border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({taxRate}%):</span>
                  <span className="font-medium">${calculateTax().toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-green-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate Invoice PDF
          </button>
        </div>
      </div>
    </div>
  );
}
