'use client';

import React from 'react';
import { useTreeContext } from '@/context/TreeContext';

const AssetDetails = () => {
  const { selectedAsset } = useTreeContext();

  if (!selectedAsset || selectedAsset.type !== 'component') {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Selecione um ativo para visualizar os detalhes.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{selectedAsset.name}</h2>
      <p className="text-sm text-gray-500">Detalhes do Ativo:</p>
      <div className="mt-4">
        <p>
          <strong>Tipo:</strong> {selectedAsset.type}
        </p>
        {selectedAsset.status && (
          <p>
            <strong>Status:</strong> {selectedAsset.status}
          </p>
        )}
        {selectedAsset.sensorType && (
          <p>
            <strong>Tipo de Sensor:</strong> {selectedAsset.sensorType}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssetDetails;
