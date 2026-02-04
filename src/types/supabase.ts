export interface Parcel {
  id: string;
  tracking_id: string;
  sender_name: string;
  sender_phone: string;
  sender_address: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_address: string;
  origin_city: string;
  destination_city: string;
  status: 'awaiting_pickup' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed' | 'cancelled';
  weight_kg: number;
  delivery_notes?: string;
  expected_delivery_date: string;
  actual_delivery_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Request {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  parcel_info: string;
  tracking_number: string;
  status: 'pending' | 'processed' | 'cancelled';
  submitted_at: string;
}