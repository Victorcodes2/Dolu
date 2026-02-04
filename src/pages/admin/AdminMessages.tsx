import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../lib/supabase';
import { Message } from '../../types/supabase';
import MessagesList from './components/MessagesList';

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setMessages(data as Message[]);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: !currentReadStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchMessages();
      toast.success(`Message marked as ${currentReadStatus ? 'unread' : 'read'}`);
    } catch (err) {
      console.error('Error updating message:', err);
      toast.error('Failed to update message status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchMessages();
      toast.success('Message deleted successfully');
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('Failed to delete message');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-800">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Messages</h2>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          {messages.filter(m => !m.read).length} Unread
        </span>
      </div>

      <MessagesList 
        messages={messages}
        onToggleRead={handleToggleRead}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminMessages;