import { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

const Tabs = ({ value, onValueChange, children }: TabsProps) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="space-y-4">{children}</div>
    </TabsContext.Provider>
  );
};

type TabsListProps = {
  children: React.ReactNode;
};

const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="flex border-b border-gray-200">
      {children}
    </div>
  );
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { value: activeValue, onValueChange } = useTabs();
  
  return (
    <button
      className={`flex items-center px-4 py-2 font-medium border-b-2 -mb-px transition-colors ${
        activeValue === value 
          ? 'border-primary-500 text-primary-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

const TabsContent = ({ value, children }: TabsContentProps) => {
  const { value: activeValue } = useTabs();
  
  if (activeValue !== value) return null;
  
  return <div className="pt-4">{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };