import React from 'react';

import { TreeProvider } from '../context/TreeContext';
import AssetTree from '@/components/AssetTree';
import Header from '@/components/Header';
import AssetDetails from '@/components/AssetDetails';
import { SubHeader } from '@/components/SubHeader';

export default function Home() {
  return (
    <TreeProvider>
      <Header />
      <main className="container mx-auto bg-slate-200 p-2">
        <div className="flex flex-col gap-2 rounded-lg border-2 border-gray-300 bg-white p-4">
          <SubHeader />

          <div className="flex gap-2">
            <div className="w-1/2 border">
              <AssetTree />
            </div>

            <div className="w-1/2 border">
              <AssetDetails />
            </div>
          </div>
        </div>
      </main>
    </TreeProvider>
  );
}
