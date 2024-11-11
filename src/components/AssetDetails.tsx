'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import {
  InboxIcon,
  ServerIcon,
  SignalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { getStatusIcon } from '@/utils/getStatusIcon';
import Image from 'next/image';

const AssetDetails = () => {
  const { selectedAsset } = useAppContext();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Load the image from sessionStorage when selectedAsset changes
  useEffect(() => {
    if (selectedAsset) {
      const storedImage = sessionStorage.getItem(
        `asset-image-${selectedAsset.id}`,
      );
      setImageUrl(storedImage);
    }
  }, [selectedAsset]);

  // Only renders if a "component" type asset is selected
  if (!selectedAsset || selectedAsset.type !== 'component') {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        sessionStorage.setItem(`asset-image-${selectedAsset.id}`, url);
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    if (selectedAsset) {
      sessionStorage.removeItem(`asset-image-${selectedAsset.id}`);
      setImageUrl(null);
    }
  };

  return (
    <>
      <div className="border-b border-gray-300 px-4 py-1">
        <p className="flex items-center gap-1 text-lg font-bold">
          {selectedAsset.name}
          {getStatusIcon(selectedAsset.status, selectedAsset.sensorType)}
        </p>
      </div>
      <div className="p-4">
        <div className="my-4 grid grid-cols-2 gap-4">
          {imageUrl ? (
            <div className="relative flex aspect-square items-center justify-center border border-dashed border-blue-300 bg-blue-50">
              <button
                onClick={handleImageRemove}
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow hover:bg-red-500 hover:text-white"
                title="Remove Image"
              >
                <TrashIcon className="absolute right-1 top-1 z-10 size-6 text-red-500" />
              </button>
              <Image src={imageUrl} alt="Asset" className="object-cover" fill />
            </div>
          ) : (
            <label
              htmlFor="upload-image"
              className="flex aspect-square cursor-pointer items-center justify-center border border-dashed border-blue-300 bg-blue-50 text-blue-500"
            >
              <div className="flex flex-col justify-center text-center">
                <InboxIcon className="mx-auto size-8" />
                <p className="text-sm">Adicionar imagem do Ativo</p>
              </div>
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

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
