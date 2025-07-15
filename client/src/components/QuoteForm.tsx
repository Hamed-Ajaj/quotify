import { useState } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { Quote, ServiceItem } from 'shared';
import { generateInvoiceNumber } from '@/lib/utils';
const QuoteForm = ({ onSubmit }) => {


  const [formData, setFormData] = useState<Quote>({
    freelancer: {
      name: '',
      email: '',
      company: '',
      phone: ''
    },
    client: {
      name: '',
      email: '',
      company: '',
      phone: ''
    },
    invoiceDetails: {
      // TODO : Add functionality from db for later 

      invoiceNo: generateInvoiceNumber(),
      invoiceDate: new Date().toISOString().slice(0, 10),
      dueDate: ''
    },
    services: [
      {
        id: 1,
        description: 'Web Development',
        rate: 50,
        quantity: 0,
        subtotal: 0
      }
    ],
    total: 0
  });


  const calculateTotal = () => {
    return formData.services.reduce((total, service) => total + service.subtotal, 0);
  };

  const serviceOptions = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'SEO Optimization',
    'Content Writing',
    'Digital Marketing',
    'Consultation',
    'Custom Development'
  ];

  const calculateSubtotal = (rate, quantity) => {
    return rate * quantity;
  };

  const updateService = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service => {
        if (service.id === id) {
          const updatedService = { ...service, [field]: value };
          if (field === 'rate' || field === 'quantity') {
            updatedService.subtotal = calculateSubtotal(
              field === 'rate' ? value : service.rate,
              field === 'quantity' ? value : service.quantity
            );
          }
          return updatedService;
        }
        return service;
      }),
      total: calculateTotal()
    }));
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      description: 'Web Development',
      rate: 50,
      quantity: 0,
      subtotal: 0
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (id) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
  };


  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    if (!formData.freelancer.name || !formData.freelancer.email ||
      !formData.client.name || !formData.client.email ||
      !formData.invoiceDetails.invoiceNo || !formData.invoiceDetails.invoiceDate ||
      !formData.invoiceDetails.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-center">Create Quote</h1>
        <p className="text-center mt-2 opacity-90">Fill in the details to generate a professional quote</p>
      </div>

      <div className="space-y-8">
        {/* Freelancer Information */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <div className="w-2 h-6 bg-blue-500 rounded mr-3"></div>
            Freelancer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.freelancer.name}
                onChange={(e) => handleInputChange('freelancer', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.freelancer.email}
                onChange={(e) => handleInputChange('freelancer', 'email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={formData.freelancer.company}
                onChange={(e) => handleInputChange('freelancer', 'company', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.freelancer.phone}
                onChange={(e) => handleInputChange('freelancer', 'phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <div className="w-2 h-6 bg-green-500 rounded mr-3"></div>
            Client Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <input
                type="text"
                value={formData.client.name}
                onChange={(e) => handleInputChange('client', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Client's full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
              <input
                type="email"
                value={formData.client.email}
                onChange={(e) => handleInputChange('client', 'email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="client@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Company</label>
              <input
                type="text"
                value={formData.client.company}
                onChange={(e) => handleInputChange('client', 'company', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Client's company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Phone</label>
              <input
                type="tel"
                value={formData.client.phone}
                onChange={(e) => handleInputChange('client', 'phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+1 (555) 987-6543"
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <div className="w-2 h-6 bg-purple-500 rounded mr-3"></div>
            Invoice Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
              <input
                type="text"
                value={formData.invoiceDetails.invoiceNo}
                onChange={(e) => handleInputChange('invoiceDetails', 'invoiceNo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="INV-2025-0001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
              <input
                type="date"
                value={formData.invoiceDetails.invoiceDate}
                onChange={(e) => handleInputChange('invoiceDetails', 'invoiceDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={formData.invoiceDetails.dueDate}
                onChange={(e) => handleInputChange('invoiceDetails', 'dueDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <div className="w-2 h-6 bg-orange-500 rounded mr-3"></div>
              Services
            </h2>
            <button
              type="button"
              onClick={addService}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {formData.services.map((service) => (
              <div key={service.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                    <select
                      value={service.description}
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {serviceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate ($/h)</label>
                    <input
                      type="number"
                      value={service.rate}
                      onChange={(e) => updateService(service.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="50"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (hours)</label>
                    <input
                      type="number"
                      value={service.quantity}
                      onChange={(e) => updateService(service.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="40"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtotal</label>
                    <div className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                      <Calculator size={16} className="mr-2 text-gray-500" />
                      <span className="font-semibold">${service.subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      disabled={formData.services.length === 1}
                      className={`w-full flex items-center justify-center px-3 py-2 rounded-md transition-colors ${formData.services.length === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 flex justify-end">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Generate Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
