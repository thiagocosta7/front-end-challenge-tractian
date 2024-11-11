import React from 'react';

import { AppProvider } from '../context/AppContext';
import { HomeContent } from '@/components/HomeContent';

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
}
