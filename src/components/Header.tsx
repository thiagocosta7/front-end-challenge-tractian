'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

const Header = () => {
  const { companies, selectedCompany, setSelectedCompany } = useAppContext();

  return (
    <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white">
      <Image src={'/logo.svg'} alt="TRACTIAN" width={103} height={14} />
      <div className="flex space-x-2">
        {companies.map((company) => {
          const isSelected = selectedCompany?.id === company.id
          return (
          <button
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className={`flex gap-1 rounded px-2 py-1 text-xs ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-blue-900 text-gray-300'
            } hover:bg-blue-500`}
          >
            <Squares2X2Icon className='size-4 text-white' />
            {company.name}
          </button>
        )})}
      </div>
    </header>
  );
};

export default Header;
