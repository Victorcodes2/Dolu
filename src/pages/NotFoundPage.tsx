import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="min-h-[70vh] flex flex-col items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Package className="w-24 h-24 text-primary-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4 text-text">Page Not Found</h1>
      <p className="text-lg mb-8 text-text/80 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
      >
        Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;