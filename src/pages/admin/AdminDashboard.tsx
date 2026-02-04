import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../lib/supabase';
import { Parcel, Message } from '../../types/supabase';
import ParcelsList from './components/ParcelsList';
import MessagesList from './components/MessagesList';
import ParcelForm from './components/ParcelForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import { Package, MessageCircle, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('parcels');
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showParcelForm, setShowParcelForm] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  
  // Fetch data on component mount
  useEffect(() => {
    fetchParcels();
    fetchMessages();
  }, []);
  
  // Fetch parcels from Supabase
  const fetchParcels = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('parcels')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setParcels(data as unknown as Parcel[]);
    } catch (err) {
      console.error('Error fetching parcels:', err);
      setError('Failed to load parcels data. Please try again.');
      toast.error('Failed to load parcels data');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setMessages(data as unknown as Message[]);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error('Failed to load messages data');
    }
  };
  
  // Add a new parcel
  const handleAddParcel = async (parcelData: Omit<Parcel, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('parcels')
        .insert([parcelData])
        .select();
      
      if (error) throw error;
      
      toast.success('Parcel added successfully');
      fetchParcels();
      setShowParcelForm(false);
    } catch (err) {
      console.error('Error adding parcel:', err);
      toast.error('Failed to add parcel');
    }
  };
  
  // Update a parcel
  const handleUpdateParcel = async (id: string, parcelData: Partial<Parcel>) => {
    try {
      const { error } = await supabase
        .from('parcels')
        .update(parcelData)
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Parcel updated successfully');
      fetchParcels();
      setSelectedParcel(null);
      setShowParcelForm(false);
    } catch (err) {
      console.error('Error updating parcel:', err);
      toast.error('Failed to update parcel');
    }
  };
  
  // Delete a parcel
  const handleDeleteParcel = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this parcel?')) return;
    
    try {
      const { error } = await supabase
        .from('parcels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Parcel deleted successfully');
      fetchParcels();
    } catch (err) {
      console.error('Error deleting parcel:', err);
      toast.error('Failed to delete parcel');
    }
  };
  
  // Mark message as read/unread
  const handleToggleMessageRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: !currentReadStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      fetchMessages();
    } catch (err) {
      console.error('Error updating message:', err);
      toast.error('Failed to update message status');
    }
  };
  
  // Delete a message
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Message deleted successfully');
      fetchMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('Failed to delete message');
    }
  };
  
  // Edit a parcel
  const handleEditParcel = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setShowParcelForm(true);
  };
  
  // Handle cancel form
  const handleCancelForm = () => {
    setSelectedParcel(null);
    setShowParcelForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        {activeTab === 'parcels' && !showParcelForm && (
          <button
            onClick={() => setShowParcelForm(true)}
            className="mt-3 md:mt-0 flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Parcel
          </button>
        )}
      </div>
      
      {showParcelForm ? (
        <ParcelForm 
          onSubmit={selectedParcel ? handleUpdateParcel : handleAddParcel}
          onCancel={handleCancelForm}
          initialData={selectedParcel}
        />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="parcels">
              <Package className="w-5 h-5 mr-2" />
              Manage Parcels
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle className="w-5 h-5 mr-2" />
              Customer Messages
              {messages.filter(m => !m.read).length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="parcels">
            <ParcelsList 
              parcels={parcels}
              isLoading={isLoading}
              error={error}
              onEdit={handleEditParcel}
              onDelete={handleDeleteParcel}
            />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessagesList 
              messages={messages}
              onToggleRead={handleToggleMessageRead}
              onDelete={handleDeleteMessage}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminDashboard;