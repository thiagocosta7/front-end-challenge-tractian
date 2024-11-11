'use client';

import { useAppContext } from '@/context/AppContext';

import { SubHeader } from './SubHeader';
import AssetTree from './AssetTree';
import AssetDetails from './AssetDetails';
import { Loader } from './Loader';
import Header from './Header';

export const HomeContent = () => {
  const { isLoading } = useAppContext();

  return (
    <>
      {isLoading && <Loader />}
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
    </>
  );
};
