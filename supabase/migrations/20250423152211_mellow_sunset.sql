/*
  # Add Pickup Requests Table

  1. New Table
    - `requests`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `parcel_info` (text)
      - `tracking_number` (text, unique)
      - `submitted_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage requests
    - Allow anonymous users to submit requests
*/

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  parcel_info text NOT NULL,
  tracking_number text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'cancelled')),
  submitted_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Create policies for requests
CREATE POLICY "Authenticated users can view all requests"
  ON requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert requests"
  ON requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update requests"
  ON requests
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete requests"
  ON requests
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to generate tracking number
CREATE OR REPLACE FUNCTION generate_tracking_number()
RETURNS trigger AS $$
BEGIN
  NEW.tracking_number := 'REQ-' || to_char(current_timestamp, 'YYYYMMDD') || '-' || substr(md5(random()::text), 1, 6);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate tracking number
CREATE TRIGGER set_tracking_number
  BEFORE INSERT ON requests
  FOR EACH ROW
  EXECUTE FUNCTION generate_tracking_number();