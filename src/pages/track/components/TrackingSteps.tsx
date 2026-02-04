import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Truck, PackageOpen, XCircle, AlertTriangle } from 'lucide-react';

type TrackingStepsProps = {
  status: 'awaiting_pickup' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed' | 'cancelled';
};

const steps = [
  { key: 'awaiting_pickup', label: 'Awaiting Pickup', icon: Clock },
  { key: 'in_transit', label: 'In Transit', icon: Truck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: PackageOpen },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const statusMap: Record<string, { index: number; color: string; icon: any }> = {
  'awaiting_pickup': { index: 0, color: 'text-amber-500', icon: Clock },
  'in_transit': { index: 1, color: 'text-blue-500', icon: Truck },
  'out_for_delivery': { index: 2, color: 'text-accent-500', icon: PackageOpen },
  'delivered': { index: 3, color: 'text-success', icon: CheckCircle },
  'delayed': { index: -1, color: 'text-amber-500', icon: AlertTriangle },
  'cancelled': { index: -1, color: 'text-red-500', icon: XCircle },
};

const TrackingSteps = ({ status }: TrackingStepsProps) => {
  const currentStatus = statusMap[status];
  const activeStep = currentStatus.index;
  
  // Check if it's a special status (delayed, cancelled)
  const isSpecialStatus = activeStep === -1;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Special status banner for delayed or cancelled */}
      {isSpecialStatus && (
        <motion.div 
          className={`flex items-center justify-center p-4 mb-6 rounded-md ${
            status === 'delayed' ? 'bg-amber-50' : 'bg-red-50'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <currentStatus.icon className={`w-5 h-5 mr-2 ${currentStatus.color}`} />
          <span className={`font-medium ${status === 'delayed' ? 'text-amber-700' : 'text-red-700'}`}>
            {status === 'delayed' ? 'Shipment Delayed' : 'Shipment Cancelled'}
          </span>
        </motion.div>
      )}
      
      {/* Progress steps */}
      <div className="relative">
        <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-200 z-0"></div>
        
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => {
            // Determine step status
            const isActive = !isSpecialStatus && index <= activeStep;
            const isCurrent = !isSpecialStatus && index === activeStep;
            
            return (
              <motion.div 
                key={step.key}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}
                >
                  {isActive ? <step.icon className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${isActive ? 'text-primary-500' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackingSteps;