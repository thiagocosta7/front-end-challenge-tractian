'use client';

import { useAppContext } from '@/context/AppContext';
import { BoltIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const SubHeader = () => {
  const { additionalFilters, setAdditionalFilters, selectedCompany } =
    useAppContext();

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
        <span className="text-sm font-normal text-gray-500">
          {' '}
          / {selectedCompany?.name}
        </span>
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => toggleFilter('showEnergySensors')}
          className={`flex items-center gap-2 rounded border px-4 py-2 ${
            additionalFilters.showEnergySensors
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-gray-300 text-gray-700'
          }`}
        >
          <BoltIcon
            className={`size-5 ${additionalFilters.showEnergySensors ? 'text-white' : 'text-blue-500'}`}
          />
          Sensor de Energia
        </button>
        <button
          onClick={() => toggleFilter('showCriticalAssets')}
          className={`flex items-center gap-2 rounded border px-4 py-2 ${
            additionalFilters.showCriticalAssets
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-gray-300 text-gray-700'
          }`}
        >
          <ExclamationCircleIcon
            className={`size-6 ${additionalFilters.showCriticalAssets ? 'text-white' : 'text-blue-500'}`}
          />
          Crítico
        </button>
      </div>
    </div>
  );
};
