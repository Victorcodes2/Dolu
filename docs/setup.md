# SwiftHaul Express - Database Setup Guide

## Database Schema

### Parcels Table

The `parcels` table stores all parcel delivery information:

```sql
CREATE TABLE parcels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text UNIQUE NOT NULL,
  sender_name text NOT NULL,
  sender_phone text NOT NULL,
  sender_address text NOT NULL,
  receiver_name text NOT NULL,
  receiver_phone text NOT NULL,
  receiver_address text NOT NULL,
  origin_city text NOT NULL,
  destination_city text NOT NULL,
  status text NOT NULL,
  weight_kg numeric NOT NULL,
  delivery_notes text,
  expected_delivery_date timestamptz NOT NULL,
  actual_delivery_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Status Values
- `awaiting_pickup`: Parcel is registered but not yet collected
- `in_transit`: Parcel is in the delivery network
- `out_for_delivery`: Parcel is out for final delivery
- `delivered`: Parcel has been delivered
- `delayed`: Delivery is delayed
- `cancelled`: Delivery has been cancelled

### Messages Table

The `messages` table stores customer inquiries:

```sql
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

## Row Level Security (RLS)

### Parcels Table Policies
- Authenticated users can view all parcels
- Authenticated users can insert new parcels
- Authenticated users can update existing parcels
- Authenticated users can delete parcels

### Messages Table Policies
- Authenticated users can view all messages
- Anyone can submit new messages
- Authenticated users can update message status
- Authenticated users can delete messages

## Environment Variables

The following environment variables must be set in `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```