/*
  # Initial Schema Setup for SwiftHaul Express

  1. New Tables
    - `parcels`
      - `id` (uuid, primary key)
      - `tracking_id` (text, unique)
      - `sender_name` (text)
      - `sender_phone` (text)
      - `sender_address` (text)
      - `receiver_name` (text)
      - `receiver_phone` (text)
      - `receiver_address` (text)
      - `origin_city` (text)
      - `destination_city` (text)
      - `status` (text)
      - `weight_kg` (numeric)
      - `delivery_notes` (text, nullable)
      - `expected_delivery_date` (timestamptz)
      - `actual_delivery_date` (timestamptz, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage parcels
    - Add policies for authenticated users to manage messages
*/

-- Create parcels table
CREATE TABLE IF NOT EXISTS parcels (
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
  status text NOT NULL CHECK (status IN ('awaiting_pickup', 'in_transit', 'out_for_delivery', 'delivered', 'delayed', 'cancelled')),
  weight_kg numeric NOT NULL CHECK (weight_kg > 0),
  delivery_notes text,
  expected_delivery_date timestamptz NOT NULL,
  actual_delivery_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for parcels
CREATE POLICY "Authenticated users can view all parcels"
  ON parcels
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert parcels"
  ON parcels
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update parcels"
  ON parcels
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete parcels"
  ON parcels
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for messages
CREATE POLICY "Authenticated users can view all messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update messages"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete messages"
  ON messages
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for parcels
CREATE TRIGGER update_parcels_updated_at
  BEFORE UPDATE ON parcels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();