import { useState, useEffect } from 'react';
import { Parcel } from '../../../types/supabase';
import { X } from 'lucide-react';

type ParcelFormProps = {
  onSubmit: (data: Partial<Parcel>, id?: string) => void;
  onCancel: () => void;
  initialData?: Parcel | null;
};

const statusOptions = [
  { value: 'awaiting_pickup', label: 'Awaiting Pickup' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const ParcelForm = ({ onSubmit, onCancel, initialData }: ParcelFormProps) => {
  const [formData, setFormData] = useState({
    tracking_id: '',
    sender_name: '',
    sender_phone: '',
    sender_address: '',
    receiver_name: '',
    receiver_phone: '',
    receiver_address: '',
    origin_city: '',
    destination_city: '',
    status: 'awaiting_pickup',
    weight_kg: 0,
    delivery_notes: '',
    expected_delivery_date: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        tracking_id: initialData.tracking_id,
        sender_name: initialData.sender_name,
        sender_phone: initialData.sender_phone,
        sender_address: initialData.sender_address,
        receiver_name: initialData.receiver_name,
        receiver_phone: initialData.receiver_phone,
        receiver_address: initialData.receiver_address,
        origin_city: initialData.origin_city,
        destination_city: initialData.destination_city,
        status: initialData.status,
        weight_kg: initialData.weight_kg,
        delivery_notes: initialData.delivery_notes || '',
        expected_delivery_date: new Date(initialData.expected_delivery_date).toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight_kg' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {initialData ? 'Edit Parcel' : 'Add New Parcel'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tracking ID */}
          <div>
            <label htmlFor="tracking_id" className="block text-sm font-medium text-gray-700 mb-1">
              Tracking ID
            </label>
            <input
              type="text"
              id="tracking_id"
              name="tracking_id"
              value={formData.tracking_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sender Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Sender Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="sender_name"
                  name="sender_name"
                  value={formData.sender_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="sender_phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="sender_phone"
                  name="sender_phone"
                  value={formData.sender_phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="sender_address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="sender_address"
                  name="sender_address"
                  value={formData.sender_address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="origin_city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="origin_city"
                  name="origin_city"
                  value={formData.origin_city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Receiver Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Receiver Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="receiver_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="receiver_name"
                  name="receiver_name"
                  value={formData.receiver_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="receiver_phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="receiver_phone"
                  name="receiver_phone"
                  value={formData.receiver_phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="receiver_address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="receiver_address"
                  name="receiver_address"
                  value={formData.receiver_address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="destination_city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="destination_city"
                  name="destination_city"
                  value={formData.destination_city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Package Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight_kg" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight_kg"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="expected_delivery_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  id="expected_delivery_date"
                  name="expected_delivery_date"
                  value={formData.expected_delivery_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="delivery_notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Notes
                </label>
                <textarea
                  id="delivery_notes"
                  name="delivery_notes"
                  value={formData.delivery_notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            {initialData ? 'Update Parcel' : 'Add Parcel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParcelForm;