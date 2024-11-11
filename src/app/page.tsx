import React from 'react';

import { TreeProvider } from '../context/TreeContext';
import AssetTree from '@/components/AssetTree';
import Header from '@/components/Header';

export default function Home() {
  return (
    <TreeProvider>
      <Header />
      <main className="container mx-auto bg-slate-200 p-2">
        <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">
              Ativos
              <span className="text-sm font-normal text-gray-500">
                / Apex Unit
              </span>
            </p>

            <div className="flex gap-2">
              <button> Sensor de Energia </button>
              <button> Crítico </button>
            </div>
          </div>
          <AssetTree />
        </div>
      </main>
    </TreeProvider>
  );
}
