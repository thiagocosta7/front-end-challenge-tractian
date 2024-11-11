'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { InboxIcon, ServerIcon, SignalIcon } from '@heroicons/react/24/outline';
import { getStatusIcon } from '@/utils/getStatusIcon';

const AssetDetails = () => {
  const { selectedAsset } = useAppContext();

  // Only renders if a "component" type asset is selected
  if (!selectedAsset || selectedAsset.type !== 'component') {
    return null;
  }

  return (
    <>
      <div className="border-b border-gray-300 px-4 py-1">
        <p className="flex items-center text-lg font-bold gap-1">
          {selectedAsset.name}
          {getStatusIcon(selectedAsset.status, selectedAsset.sensorType)}
        </p>
      </div>
      <div className="p-4">
        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center border border-dashed border-blue-300 bg-blue-50 text-blue-500">
            <div className="flex aspect-square flex-col justify-center text-center">
              <InboxIcon className="mx-auto size-8" />
              <p className="text-sm">Adicionar imagem do Ativo</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-evenly">
            <div>
              <p className="mb-1 text-sm font-semibold">Tipo de Equipamento</p>
              <p className="text-gray-500">-</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="mb-1 text-sm font-semibold">Responsáveis</p>
              <div className="flex items-center">
                <p className="text-gray-500">-</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold">Sensor</p>
            <div className="flex items-center">
              <SignalIcon className="mr-2 h-5 w-5 text-blue-500" />
              <p className="text-gray-500">{selectedAsset.sensorId || 'N/A'}</p>
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold">Receptor</p>
            <div className="flex items-center">
              <ServerIcon className="mr-2 h-5 w-5 text-blue-500" />
              <p className="text-gray-500">
                {selectedAsset.gatewayId || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetDetails;
