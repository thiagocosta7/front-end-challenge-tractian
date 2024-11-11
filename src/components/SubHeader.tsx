'use client';

import { useTreeContext } from '@/context/TreeContext';
import React from 'react';

export const SubHeader = () => {
  const { additionalFilters, setAdditionalFilters } = useTreeContext();

  const toggleFilter = (filterKey: keyof typeof additionalFilters) => {
    setAdditionalFilters({
      ...additionalFilters,
      [filterKey]: !additionalFilters[filterKey],
    });
  };

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-xl font-bold">
        Ativos
        <span className="text-sm font-normal text-gray-500">/ Apex Unit</span>
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => toggleFilter('showEnergySensors')}
          className={`rounded px-4 py-2 ${
            additionalFilters.showEnergySensors
              ? 'bg-blue-500'
              : 'bg-gray-200 text-black'
          }`}
        >
          Sensor de Energia
        </button>
        <button
          onClick={() => toggleFilter('showCriticalAssets')}
          className={`rounded px-4 py-2 ${
            additionalFilters.showCriticalAssets
              ? 'bg-red-500'
              : 'bg-gray-200 text-black'
          }`}
        >
          Crítico
        </button>
      </div>
    </div>
  );
};
