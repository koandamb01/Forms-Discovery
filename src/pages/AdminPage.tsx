import React, { useState } from 'react';
import { AdminPanel } from '../components/features/AdminPanel';

export function AdminPage() {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)} 
      />
    </div>
  );
}